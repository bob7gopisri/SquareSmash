var models         = require('../models');
var LocalStrategy    = require('passport-local').Strategy;
var user_model             = models.user;

module.exports = function (app, passport) {

    // serialize sessions
    passport.serializeUser(function(user, done) {
        config.log(user);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        user_model.findOne({ _id: id }, function (err, user) {
            done(err, user)
        });
    });

    // use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {

            user_model.findOne( {where: { email: email }}).then(function (user, err) {

                console.log("passport.js");
                console.log(user);
                console.log(err);
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, { message: 'This email is not registered' });
                }

                if (!user.authenticate(password)) {
                    return done(null, false, { message: 'Invalid login or password' });
                }

                return done(null, user);
            });
        }
    ));

};