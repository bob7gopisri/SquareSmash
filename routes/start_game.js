var express = require('express');
var router = express.Router();
var models = require('../models');
var game_model = models.game;


router.get('/:permalink', function(req, res, next) {
    var permalink = req.params.permalink;
    var num_rows = 3;
    var num_columns = 3;
    var max_players = 2;

    game_model.findOne({where: {permalink: permalink}}).then(function (game) {
        console.log("where am I");
        console.log(game);
        if (game !== null) {
            console.log("Did I come to IFFER");
            console.log(game.num_rows);
            console.log(game.num_columns);
            console.log(game.max_players);
            console.log("how am I");
            req.flash('error', 'We have already an game name: ' + game);
            res.render('start_game', { title: 'SquareSmash',
                num_rows: game.num_rows,
                num_columns: game.num_columns,
                max_players: game.max_players});
        } else { // no user found
            console.log("Did I come to else");
        }
    });
});

router.get('/', function(req, res) {
    res.status(200).end();
});


module.exports = router;
