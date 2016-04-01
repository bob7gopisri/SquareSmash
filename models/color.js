'use strict';
module.exports = function(sequelize, DataTypes) {
  var color = sequelize.define('color', {
    red: DataTypes.INTEGER,
    blue: DataTypes.INTEGER,
    green: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return color;
};