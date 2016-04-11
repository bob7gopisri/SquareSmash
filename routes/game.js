var express = require('express');
var router = express.Router();
var models = require('../models');
var game_model = models.game;


router.get('/:permalink', function(req, res, next) {
    var permalink = req.params.permalink;

    game_model.findOne({where: {permalink: permalink}}).then(function (game) {
        console.log("where am I");
        console.log(game);
        if (game !== null) {
            req.flash('error', 'We have already an game name: ' + game);
            res.render('game', { title: 'SquareSmash',
                num_rows: game.num_rows,
                num_columns: game.num_columns,
                max_players: game.max_players});

        } else { // no game found
            req.flash('error', 'No game found at ' + permalink);
            res.redirect('/play');
        }
    });
});

/* Get the max number of players */
router.get('/max_players/:permalink', function(req, res, next) {
    var permalink = req.params.permalink;

    var response = {};
    game_model.findOne({where: {permalink: permalink, status: ['created', 'in_progress']}}).then(function (game) {
        console.log("where am I");
        console.log(game);
        if (game !== null) {
            res.send(200, game.max_players);
        } else { // no game found
            res.send(400, 0);
        }
    });
});

router.get('/', function(req, res) {
    res.status(200).end();
});


module.exports = router;
