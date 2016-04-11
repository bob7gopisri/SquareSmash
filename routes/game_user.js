var express = require('express');
var router = express.Router();
var models = require('../models');
var game_user_model = models.game_user;


router.post('/', function(req, res, next) {
    console.log("came here to post");
    var game_id = req.body.game_id;
    var user_name = req.body.user_name;
    var user_color = req.body.user_color;

    game_user_model.findOne({where: {game_id: game_id, user_name: user_name}}).then(function (game_user) {
        if (game_user !== null) {
            res.status(409).end();
        } else { // no game user found
            var g = game_user_model.build({game_id: game_id, user_name: user_name, user_color: user_color,
                user_status: 1});
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

router.get('/', function(req, res) {
    res.status(200).end();
});


module.exports = router;
