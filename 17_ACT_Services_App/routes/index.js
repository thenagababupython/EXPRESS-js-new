const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// Get the database connection
const getDB = require('../database/dbOperations').getDB;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

/* GET Raise complaints page. */
router.get('/raise', function(req, res, next) {
    res.render('raise-complaints.ejs');
});

/* GET List Of Complaints page. */
router.get('/list', function(req, res, next) {
    // Fetch records from Database
    const db = getDB();
    db.collection('complaint').find({}).toArray((err,complaints) => {
        if(err){
            return console.log(err);
        }
        res.render('list-of-complaints.ejs', {complaints : complaints});
    });
});

/* POST Raise Complaints page. */
router.post('/complain', urlencodedParser , function(req, res, next) {
    let complaint = req.body;

    // Store the Complaint to Database
    const db = getDB();
    db.collection('complaint').insertOne(complaint,(err , data) => {
        if(err) throw err;
        res.render('raise-complaints-success.ejs', {complaint : complaint});
    });
});

module.exports = router;
