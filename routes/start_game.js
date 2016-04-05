var express = require('express');
var router = express.Router();

/* GET Game page. */
router.get('/start_game/:permalink', function(req, res, next) {
    var permalink = req.params.permalink;
    var num_rows = req.body.num_rows;
    var num_columns = req.body.num_columns;
    var max_players = req.body.max_players;
    console.log('In Start Game.js');
    console.log(permalink);
    console.log(num_rows);
    console.log(num_columns);
    console.log(max_players);

    res.render('start_game', { title: 'SquareSmash',
        num_rows: num_rows,
        num_columns: num_columns,
        max_players: max_players});
});

router.get('/', function(req, res) {
    res.status(200).end();
});

module.exports = router;
