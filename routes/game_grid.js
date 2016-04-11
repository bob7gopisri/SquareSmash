var express = require('express');
var router = express.Router();
var models = require('../models');
var game_grid_model = models.game_grid;


router.get('/:game_id', function(req, res, next) {
    var game_id = req.params.game_id;

    game_grid_model.findAll({where: {game_id: game_id}}).then(function (game_grid) {
        if (game_grid !== null) {
            res.send(200, game_grid);
        } else { // no game found
            res.send(400, []);
        }
    });
});

router.get('/', function(req, res) {
    res.status(200).end();
});


module.exports = router;
