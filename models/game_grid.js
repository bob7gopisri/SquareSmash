'use strict';
module.exports = function(sequelize, DataTypes) {
  var game_grid = sequelize.define('game_grid', {
    game_id: DataTypes.STRING,
    row_id: DataTypes.INTEGER,
    column_id: DataTypes.INTEGER,
    color: DataTypes.STRING,
    is_clicked: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return game_grid;
};