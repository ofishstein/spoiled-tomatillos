'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Users', 'profileImageUrl', Sequelize.STRING);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'profileImageUrl');
  }
};
