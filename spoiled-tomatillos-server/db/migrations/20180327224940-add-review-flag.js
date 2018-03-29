'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Reviews', 'flagged', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Reviews', 'flagged');
  }
};
