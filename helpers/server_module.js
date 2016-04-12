var request = require('request');

var refresh_time = 2000;
exports.refresh_time = refresh_time;

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

    updateGameStatus: function(room, status, callback)
    {
        var return_response = {};

        /* Update Game status */
        request({
            url: 'http://localhost:3000/game/update_status/' + room + '/' + status,
            qs: {from: 'server', time: +new Date()}, //Query string data
            method: 'PUT',
            json: {

            }
        }, function(error, response, body) {
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
    },

    updateGridCell: function(room, color, row_id, column_id, callback)
    {
        var return_response = {};

        /* Update grid cell with the color for current game */
        request({
            url: 'http://localhost:3000/game_grid/update_cell/' + room,
            qs: {from: 'server', time: +new Date()}, //Query string data
            method: 'PUT',
            json: {
                row_id: row_id,
                column_id: column_id,
                color: color
            }
        }, function(error, response, body) {
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

    updateUserScore: function(room, username, callback)
    {
        var return_response = {};

        /* Update user score for current game */
        request({
            url: 'http://localhost:3000/game_user/update_score/' + room + '/' + user_name,
            qs: {from: 'server', time: +new Date()}, //Query string data
            method: 'PUT',
            json: {
            }
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var game_users = JSON.parse(body);
                return_response = {
                    response_code: 200,
                    game_users: game_users
                };
            }
            else {
                return_response = {
                    response_code: 400,
                    game_users: []
                };
            }
            callback(return_response);
        });
    },

    checkAndUpdateGameStatus: function(grid, game_users, room, callback){
        var grid_complete = 1;
        for (i=0; i < grid.length; i++){
            if(grid[i].color == null){
                grid_complete = 0;
                break;
            }
        }
        var game_winners = [game_users[0].user_name];
        var game_winner_score = game_users[0].user_score;
        var game_winner_count = 1;
        if (grid_complete){
            for (i=1;i<game_users.length; i++){
                if (game_winner_score == game_users[i].user_score){
                    game_winners.push(game_users[i].user_name);
                }
                else{
                    break;
                }
            }
            /* Update the game status for current game */
            request({
                url: 'http://localhost:3000/game/update_status/' + room + '/complete',
                qs: {from: 'server', time: +new Date()}, //Query string data
                method: 'PUT',
                json: {
                }
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    return_response = {
                        response_code: 200,
                        game_status: 'complete',
                        game_winners: game_winners
                    };
                }
                else {
                    return_response = {
                        response_code: 400,
                        game_status: 'complete',
                        game_winners: game_winners
                    };
                }
                callback(return_response);
            });
        }
        else{
            return_response = {
                response_code: 200,
                game_status: 'in_progress',
                game_winners: null
            };
            callback(return_response);
        }
    },

    updateGameUserStatus: function(room, username, status, callback)
    {
        var return_response = {};

        /* Update user score for current game */
        request({
            url: 'http://localhost:3000/game_user/update_status/' + room + '/' + username + '/' + status,
            qs: {from: 'server', time: +new Date()}, //Query string data
            method: 'PUT',
            json: {
            }
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var game_users = JSON.parse(body);
                var active_users = 0;
                for (i=0;i<game_users.length;i++){
                    if (game_users[i].user_status == 1){
                        active_users++;
                    }
                }
                return_response = {
                    response_code: 200,
                    game_users: game_users,
                    active_users: active_users
                };
            }
            else {
                return_response = {
                    response_code: 400,
                    game_users: []
                };
            }
            callback(return_response);
        });
    }
};

