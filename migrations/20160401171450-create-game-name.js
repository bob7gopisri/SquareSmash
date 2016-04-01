'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('game_names', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      min_players: {
        allowNull: false,
        default: 2,
        type: Sequelize.INTEGER
      },
      max_players: {
        allowNull: false,
        default: 10,
        type: Sequelize.INTEGER
      },
      refresh_time: {
        allowNull: false,
        default: 1,
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('game_names');
  }
};