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

router.put('/update_cell/:game_id', function(req, res, next) {
    var game_id = req.params.game_id;
    var row_id = req.body.row_id;
    var column_id = req.body.column_id;
    var color = req.body.color;

    game_grid_model.findOne({where: {game_id: game_id, row_id: row_id, column_id: column_id, color: null}}).then(function (grid_cell) {
        if (grid_cell) {
            game_grid_model.updateAttributes({color: color}).then(function (result) {
                if (result == null){
                    res.send(400, []);
                }
                else {
                    game_grid_model.findAll({where: {game_id: game_id}}).then(function (game_grid){
                        if (game_grid !== null) {
                            res.send(200, game_grid);
                        } else { // no game found
                            res.send(400, []);
                        }
                    });
                }
            });
        } else { // no game grid for found
            game_grid_model.findAll({where: {game_id: game_id}}).then(function (game_grid){
                if (game_grid !== null) {
                    res.send(200, game_grid);
                } else { // no game found
                    res.send(400, []);
                }
            });
        }
    });
});

router.get('/', function(req, res) {
    res.status(200).end();
});


module.exports = router;
