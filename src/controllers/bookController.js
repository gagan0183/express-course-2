var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookController = function(bookService, nav) {
    var middleware = function(req, res, next) {
        if(!req.user) {
            res.redirect('/');
        }
        next();
    };

    var getIndex = function(req, res) {
        var url = "mongodb://gagan:ARIHANT@ds119223.mlab.com:19223/express";
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function(err, results) {
                res.render('books', {title: 'welcome to ejs', nav: nav, books: results});
            });
        });
    };
    var getById = function(req, res) {
        var id = new objectId(req.params.id);
        var url = "mongodb://gagan:ARIHANT@ds119223.mlab.com:19223/express";
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.findOne({_id: id}, function(err, results) {
                bookService.getBookById(results.bookId, function(err, book) {
                    results.book = book;
                    res.render('book', {title: 'welcome to ejs', nav: nav, book: results});
                });
            });
        });
    };   
    
    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    }
};

module.exports = bookController;