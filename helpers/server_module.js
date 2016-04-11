var Client = require('node-rest-client').Client;
var request = require('request');

var client = new Client();

module.exports = {

    insertGameUser: function(username, room, color, callback)
    {
        var return_response = {};

        var max_users = 0;
        var num_game_users = 0;

        /* Get Max Number of Users for the current game */
        request.get('http://localhost:3000/game/max_players/' + room, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("GET GAME RESPONSE" + body);
                max_users = parseInt(body);
                console.log("HERE " + max_users);

                /* Get the current Number of Game Users */
                request.get('http://localhost:3000/game_user/all_users/' + room, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log("NEW GET RESPONSE " + body); // Show the HTML for the Modulus homepage.
                        var game_users = JSON.parse(body);
                        console.log("HELLO AGAIN " + game_users);
                        num_game_users = parseInt(game_users.length);
                        console.log("HELLO AGGGAIN " + max_users + " HHI " + num_game_users);

                        /* Create New Game Users and Return Response */
                        if (max_users > num_game_users){
                            console.log("DID I COME TO IF");
                            request({
                                url: 'http://localhost:3000/game_user',
                                qs: {from: 'server', time: +new Date()}, //Query string data
                                method: 'POST',
                                json: {
                                    user_name: username,
                                    game_id: room,
                                    user_color: color
                                }
                            }, function (error, response, body) {
                                if(error) {
                                    return_response = {
                                        response_code: 500,
                                        game_users: []
                                    };
                                    callback(return_response);
                                }

                                // raw response
                                console.log("RESPONSE" + response.statusCode);
                                if (response.statusCode == 200) {
                                    request.get('http://localhost:3000/game_user/all_users/' + room, function (error, response, body) {
                                        if (!error && response.statusCode == 200) {
                                            console.log("NEW GET RESPONSE " + body); // Show the HTML for the Modulus homepage.
                                            var game_users = JSON.parse(body);
                                            console.log(game_users[0].user_name);
                                            return_response = {
                                                response_code: 200,
                                                game_users: game_users
                                            };
                                            callback(return_response);
                                        }
                                    });
                                }
                                else
                                {
                                    return_response = {
                                        response_code: response.statusCode,
                                        game_users: []
                                    };
                                    callback(return_response);
                                }
                            });
                        }
                        else {
                            console.log("DID I COME TO ELSE");
                            return_response = {
                                response_code: 400,
                                game_users: []
                            };
                            callback(return_response);
                        }

                    }
                    else {
                        return_response = {
                            response_code: 400,
                            game_users: []
                        };
                        callback(return_response);
                    }
                });

            }
            else {
                return_response = {
                    response_code: 400,
                    game_users: []
                };
                callback(return_response);
            }
        });
    },

    getGameGrid: function(room, callback)
    {
        var return_response = {};


        /* Get Max Number of Users for the current game */
        request.get('http://localhost:3000/game_grid/' + room, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var game_grid = JSON.parse(body);
                return_response = {
                    response_code: 200,
                    game_grid: game_grid
                };
            }
            else {
                return_response = {
                    response_code: 400,
                    game_grid: []
                };
            }
            callback(return_response);
        });

    },

    updateGameStatus: function(room, status, callback){
        var return_response = {};

        /* Update Game status */
        request('http://localhost:3000/game/' + room + '/' + status, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                return_response = {
                    response_code: 200};
            }
            else {
                return_response = {
                    response_code: 400};
            }
            callback(return_response);
        });
    }


};

