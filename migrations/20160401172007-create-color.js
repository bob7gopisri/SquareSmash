'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('colors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      red: {
        allowNull: false,
        default: 0,
        type: Sequelize.INTEGER
      },
      blue: {
        allowNull: false,
        default: 0,
        type: Sequelize.INTEGER
      },
      green: {
        allowNull: false,
        default: 0,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('colors');
  }
};