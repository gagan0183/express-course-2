var express = require('express');
var bookRouter = express.Router();
var bookService =  require('../services/goodreadService')();

var bookRouters = function(nav) {
    var cbookController = require('../controllers/bookController')(bookService, nav);

    bookRouter.use(cbookController.middleware);

    bookRouter.route('/')
    .get(cbookController.getIndex);

    bookRouter.route('/:id')
    .get(cbookController.getById);

    return bookRouter;
};

module.exports = bookRouters;