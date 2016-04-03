/**
 * Created by gopisrinath on 4/1/16.
 */
var express = require('express');
var passport = require('../config/passport.js');
var util = require('../config/util.js');
var models = require('../models');
var user_model = models.user;
//var user = require('../models/user.js')

var router = express.Router();

router.get('/', function(req, res) {
    var errors = req.flash('error');
    var error = '';
    if (errors.length) {
        error = errors[0];
    }

    res.render('register', {
        title: 'SquareSmash - Register',
        error: error,
        isLoginPage: true
    });
});


router.post('/', function(req, res, next) {

    var email = req.body.email;
    var name = req.body.userName;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    console.log(email);
    user_model.findOne({where: {email: email}}).then(function (user) {
        console.log("where am I");
        console.log(user);
        if (user !== null) {
            console.log("Did I come to if");
            req.flash('registerStatus', false);
            req.flash('error', 'We have already an account with email: ' + email);
            res.redirect('/register');
        } else { // no user found
            console.log("Did I come to else");
            if(password === confirmPassword) {
                var u = user_model.build({ username: name, email: email, password: util.encrypt(password) });
                u.save().then(function (userobj) {
                    console.log(userobj);
                    if (userobj == null) {
                        console.log("iflog");
                        //next(err);
                    } else {
                        console.log("errlog");
                        console.log('new user:' + u);
                        console.log('new userobj:' + userobj);
                        req.login(u, function(obj) {
                            console.log(obj);
                            //if (obj) { return next(obj); }

                            //req.flash('registerStatus', true);
                            //req.flash('registerSuccessMessage', 'Welcome ' + obj.username + "!");
                            res.redirect('/');
                        });
                    }
                });
            } else {
                req.flash('registerStatus', false);
                req.flash('error', 'The confirmation password does not match the password');
                res.redirect('/register');
            }
        }
    });
});

module.exports = router;

