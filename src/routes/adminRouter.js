var express = require('express');

var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function(nav) {
    
    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = "mongodb://gagan:ARIHANT@ds119223.mlab.com:19223/express";
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function(err, results) {
                    res.send(results);
                    db.close();
                });
            });           
        });

    return adminRouter;
};

module.exports = router;