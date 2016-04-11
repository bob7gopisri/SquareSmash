'use strict';
module.exports = function(sequelize, DataTypes) {
  var game_user = sequelize.define('game_user', {
    game_id: DataTypes.STRING,
    user_name: DataTypes.STRING,
    user_color: DataTypes.STRING,
    user_status: DataTypes.BOOLEAN,
    user_score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return game_user;
};