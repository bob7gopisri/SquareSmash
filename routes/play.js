/**
 * Created by gopisrinath on 3/30/16.
 */
var express = require('express');
var util = require('../config/util.js');
var router = express.Router();

//router.get('/', function(req, res) {
//    res.render('play', {
//        title: 'Chess Hub - Game',
//        user: req.user,
//        isPlayPage: true
//    });
//});

router.get('/play/:id', function (req, resp) {

    router.post('/', function (req, res) {
        var side = req.body.side;
        var token = util.randomString(20);
        res.redirect('/start_game');
    });
});

module.exports = router;