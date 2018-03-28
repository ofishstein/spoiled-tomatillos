'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return Promise.all([queryInterface.renameColumn('WatchlistItems', 'playlistId', 'watchlistId'),
      queryInterface.renameColumn('WatchlistComments', 'playlistId', 'watchlistId')]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    return Promise.all([queryInterface.renameColumn('WatchlistItems', 'watchlistId', 'playlistId'),
      queryInterface.renameColumn('WatchlistComments', 'watchlistId', 'playlistId')]);
  }
};
