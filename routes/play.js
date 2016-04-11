/**
 * Created by gopisrinath on 3/30/16.
 */
var express = require('express');
var util = require('../config/util.js');
var models = require('../models');
var game_model = models.game;
var game_grid_model = models.game_grid;

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
    var num_rows = req.body.num_rows;
    var num_columns = req.body.num_columns;
    var max_players = req.body.max_players;
    var user_name = req.body.user_name;

    console.log('In play.js');
    console.log(permalink);
    console.log(num_rows);
    console.log(num_columns);
    console.log(max_players);
    console.log(user_name);

    var bulk_payload = createBulkGridPayload(num_rows, num_columns, permalink);
    console.log(bulk_payload);
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
                    var grid = game_grid_model.bulkCreate(bulk_payload).then(function() {
                        var grid = game_grid_model.findAll({where: {game_id: permalink}});
                        console.log(grid);

                        g.updateAttributes({status: 'created'}).then(function (result) {
                            if (result == null) {
                                res.status(500).end();
                            }
                            else {
                                res.redirect('/game/' + permalink);
                            }
                        });
                    });
                }
            });
        }
    });
});

function createBulkGridPayload(num_rows, num_columns, permalink) {
    var payload = new Array(num_rows*num_columns);
    for(i=0;i<num_rows;i++){
        for(j=0;j<num_columns;j++){
            payload[i*num_columns+j] = {row_id: i, column_id: j, game_id: permalink, is_clicked: 0};
        }
    }
    return payload;
}


module.exports = router;
