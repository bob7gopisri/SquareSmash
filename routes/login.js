/**
 * Created by gopisrinath on 3/30/16.
 */
var express = require('express');
var passport = require('passport');
var models = require('../models');
var user_model = models.user;

var router = express.Router();

router.get('/', function(req, res) {
    var errors = req.flash('error');
    var error = '';
    if (errors.length) {
        error = errors[0];
    }

    res.render('login', {
        title: 'SquareSmash - Login',
        error: error,
        isLoginPage: true
    });
});

router.post('/',
passport.authenticate('local',{ failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
        user_model.findOneAndUpdate({_id: req.user._id}, { lastConnection: new Date() }, {} ,function (err, user) {
            req.flash('welcomeMessage', 'Welcome ' + user.name + '!');
            res.redirect('/');
        });
    });

module.exports = router;