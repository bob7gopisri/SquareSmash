'use strict';
module.exports = function(sequelize, DataTypes) {
  var game = sequelize.define('game', {
    num_rows: DataTypes.INTEGER,
    num_columns: DataTypes.INTEGER,
    max_players: DataTypes.INTEGER,
    permalink: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return game;
};
