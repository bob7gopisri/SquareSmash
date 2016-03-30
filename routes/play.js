/**
 * Created by gopisrinath on 3/30/16.
 */
var express = require('express');
var util = require('../config/util.js');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('play', {
        title: 'Chess Hub - Game',
        user: req.user,
        isPlayPage: true
    });
});

router.post('/', function(req, res) {
    var side = req.body.side;
    var token = util.randomString(20);
    res.redirect('/game/' + token + '/' + side);
});

module.exports = router;