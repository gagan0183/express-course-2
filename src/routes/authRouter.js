var express = require('express');
var mongodb = require('mongodb');
var passport = require('passport');

var authRouter = express.Router();

var router = function(nav) {
    authRouter.route('/signUp')
            .post(function(req, res) {
                console.log(req.body);
                var url = "mongodb://gagan:ARIHANT@ds119223.mlab.com:19223/express";
                mongodb.connect(url, function(err, db) {
                    var collection = db.collection('users');
                    var user = {
                        username: req.body.username,
                        password: req.body.password
                    };
                    collection.insert(user, function(err, results) {
                        req.login(req.body, function() {
                            res.redirect('/auth/profile');
                        });
                    });
                });
            });
    authRouter.route('/signIn')
           .post(passport.authenticate('local', {
               failureRedirect: '/'
           }),  function(req, res) {
                res.redirect('/auth/profile');
           });
    authRouter.route('/profile')
            .all(function(req, res, next) {
                if(!req.user) {
                    res.redirect('/');
                }
                next();
            })
            .get(function(req, res) {
                res.json(req.user);
            }); 
            return authRouter;
};

module.exports = router;