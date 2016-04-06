/**
 * Created by gopisrinath on 3/30/16.
 */
var express = require('express');
var util = require('../config/util.js');
var models = require('../models');
var game_model = models.game;

var router = express.Router();

router.get('/', function(req, res) {
    res.render('play', {
        title: 'SquareSmash - Game',
        user: req.user,
        isPlayPage: true
    });
});

router.post('/', function (req, res) {
    //var side = req.body.side;
    var permalink = util.randomString(20);
    //res.redirect('/start_game');
    var num_rows = req.body.num_rows;
    var num_columns = req.body.num_columns;
    var max_players = req.body.max_players;
    console.log('In play.js');
    console.log(permalink);
    console.log(num_rows);
    console.log(num_columns);
    console.log(max_players);

    game_model.findOne({where: {permalink: permalink}}).then(function (game) {
        console.log("where am I");
        console.log(game);
        if (game !== null) {
            console.log("Did I come to if");
            req.flash('error', 'We have already an game name: ' + game);
            res.redirect('/play');
        } else { // no user found
            console.log("Did I come to else");
            var g = game_model.build({num_rows: num_rows,
                num_columns: num_columns, max_players: max_players,
                permalink: permalink });
            g.save().then(function (gameobj) {
                console.log(gameobj);
                if (gameobj == null) {
                    console.log("iflog");
                    //next(err);
                } else {
                    res.redirect('/start_game/' + permalink );

                    //req.login(u, function(obj) {
                    //    console.log(obj);
                        //if (obj) { return next(obj); }

                        //req.flash('registerStatus', true);
                        //req.flash('registerSuccessMessage', 'Welcome ' + obj.username + "!");
                        //res.redirect('/');
                    //});
                }
            });

        }
    });
});


module.exports = router;