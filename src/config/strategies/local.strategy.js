var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done) {
        var url = "mongodb://gagan:ARIHANT@ds119223.mlab.com:19223/express";
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('users');
            collection.findOne({username: username}, function(err, results) {
                if(results === null) {
                    done(null, false, {message: 'Passwords'});
                }
                else {
                    if(results.password === password) {
                        var user = results;
                        done(null, user);
                    }
                    else {
                        done(null, false, {message: 'Passwords'});
                    }
                }
            });
        });
    }));
};