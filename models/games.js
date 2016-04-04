'use strict';
module.exports = function(sequelize, DataTypes) {
  var games = sequelize.define('games', {
    num_rows: DataTypes.INTEGER,
    num_column: DataTypes.INTEGER,
    max_players: DataTypes.INTERGER,
    permalink: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return games;
};