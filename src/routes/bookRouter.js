var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookRouters = function(nav) {

    bookRouter.route('/')
    .get(function(req, res) {
        var url = "mongodb://gagan:ARIHANT@ds119223.mlab.com:19223/express";
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function(err, results) {
                res.render('books', {title: 'welcome to ejs', nav: nav, books: results});
            });
        });    
    });

    bookRouter.route('/:id')
    .get(function(req, res) {
        var id = new objectId(req.params.id);
        var url = "mongodb://gagan:ARIHANT@ds119223.mlab.com:19223/express";
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.findOne({_id: id}, function(err, results) {
                res.render('book', {title: 'welcome to ejs', nav: nav, book: results});
            });
        });    
    });

    return bookRouter;
};

module.exports = bookRouters;