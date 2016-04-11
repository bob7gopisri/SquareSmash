var Client = require('node-rest-client').Client;

var client = new Client();

module.exports = {

    insertGameUser: function(username, room, color, callback)
    {
        var args = {
            data: {user_name: username, game_id: room, user_color: color},
            headers: {"Content-Type": "application/json"}
        };

        client.post('http://localhost:3000/game_user', args, function (data, response) {
            // parsed response body as js object
            //console.log(data);
            // raw response
            console.log("RESPONSE" + response.statusCode);
            callback(response.statusCode);
        });
    }
};

