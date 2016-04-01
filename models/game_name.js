'use strict';
module.exports = function(sequelize, DataTypes) {
  var game_name = sequelize.define('game_name', {
    name: DataTypes.STRING,
    min_players: DataTypes.INTEGER,
    max_players: DataTypes.INTEGER,
    refresh_time: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return game_name;
};