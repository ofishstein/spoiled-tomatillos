'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('WatchlistItems'),
      queryInterface.dropTable('WatchlistComments')
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('WatchlistItems', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        movieId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Movies',
            key: 'id'
          }
        },
        playlistId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Watchlists',
            key: 'id'
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
      queryInterface.createTable('WatchlistComments', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        commenterId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        watchlistId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Watchlists',
            key: 'id'
          }
        },
        text: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })]);
  }
}
