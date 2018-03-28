'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Movies', 'poster', Sequelize.STRING);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Reviews', 'poster');
  }
};
