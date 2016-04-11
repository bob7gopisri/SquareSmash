'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      num_rows: {
        type: Sequelize.INTEGER,
        defaultValue: 3
      },
      num_columns: {
        type: Sequelize.INTEGER,
        defaultValue: 3
      },
      max_players: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 2
      },
      permalink: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'init'
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
    return queryInterface.dropTable('games');
  }
};
