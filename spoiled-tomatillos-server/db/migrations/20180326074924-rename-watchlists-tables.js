'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return Promise.all([queryInterface.renameTable('Playlists', 'Watchlists'),
      queryInterface.renameTable('PlaylistItems', 'WatchlistItems'),
      queryInterface.renameTable('PlaylistComments', 'WatchlistComments')]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    return Promise.all([queryInterface.renameTable('Watchlists', 'Playlists'),
      queryInterface.renameTable('WatchlistItems', 'PlaylistItems'),
      queryInterface.renameTable('WatchlistComments', 'PlaylistComments')]);
  }
};
