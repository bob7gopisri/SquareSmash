// Setup basic express server
var express = require('express');


var router = express.Router();
router.get('/', function(req, res) {
    var numUsers = 0;
    console.log("yoyo honeysingh");


  res.render('search', {
    title: 'SquareSmash - Game'});
});


// Chatroom



module.exports = router;