var express = require('express');
var router = express.Router();
var models = require('../models');
var game_user_model = models.game_user;

/* Create Game User */
router.post('/', function(req, res, next) {
    console.log("came here to post");
    var game_id = req.body.game_id;
    var user_name = req.body.user_name;
    var user_color = req.body.user_color;

    game_user_model.findOne({where: {game_id: game_id, user_name: user_name}}).then(function (game_user) {
        if (game_user !== null) {
            if (game_user.user_status) {
                res.status(409).end();
            }
            else {
                game_user.updateAttributes({user_status: 1}).then(function (result) {
                    if (result == null){
                        res.status(500).end();
                    }
                    else {
                        res.send(result);
                    }
                });
            }
        } else { // no game user found
            var g = game_user_model.build({game_id: game_id, user_name: user_name, user_color: user_color,
                user_status: 1, user_score: 0});
            g.save().then(function (gameuserobj) {
                if (gameuserobj == null) {
                    res.status(500).end();
                } else {
                    res.send(gameuserobj);
                }
            });
        }
    });
});

/* Update user score */
router.put('/update_score/:game_id/:user_name', function(req, res, next) {
    var game_id = req.params.game_id;
    var user_name = req.params.user_name;

    game_user_model.findOne({where: {game_id: game_id, user_name: user_name}}).then(function (game_user) {
        if (game_user) {
            game_user_model.updateAttributes({user_score: game_user.user_score + 1}).then(function (result) {
                if (result == null){
                    res.send(400, []);
                }
                else {
                    game_user_model.findAll({where: {game_id: game_id}, order: [['user_score', 'DESC']]}).then(function (game_users) {
                        if (game_users !== null) {
                            res.send(200, game_users);
                        } else { // no game user found
                            res.send(200, []);
                        }
                    });
                }
            });
        } else { // no game user found
            res.send(400, []);
        }
    });
});

/* Update user status */
router.put('/update_status/:game_id/:user_name/:user_status', function(req, res, next) {
    var game_id = req.params.game_id;
    var user_name = req.params.user_name;
    var user_status = parseInt(req.params.user_status);

    game_user_model.findOne({where: {game_id: game_id, user_name: user_name}}).then(function (game_user) {
        if (game_user) {
            game_user_model.updateAttributes({user_status: user_status}).then(function (result) {
                if (result == null){
                    res.send(400, []);
                }
                else {
                    game_user_model.findAll({where: {game_id: game_id}, order: [['user_score', 'DESC']]}).then(function (game_users) {
                        if (game_users !== null) {
                            console.log("IN GET ALL GAME USERS");
                            console.log(game_users);
                            res.send(200, game_users);
                        } else { // no game user found
                            res.send(200, []);
                        }
                    });
                }
            });
        } else  {// no game user found
            res.status(400, []);
        }
    });
});

router.get('/all_users/:game_id', function(req, res, next) {
    var game_id = req.params.game_id;

        game_user_model.findAll({where: {game_id: game_id}, order: [['user_score', 'DESC']]}).then(function (game_users) {
        if (game_users !== null) {
            console.log("IN GET ALL GAME USERS");
            console.log(game_users);
            res.send(200, game_users);
        } else { // no game user found
            res.send(200, []);
        }
    });
});

router.get('/', function(req, res) {
    res.status(200).end();
});
module.exports = router;
