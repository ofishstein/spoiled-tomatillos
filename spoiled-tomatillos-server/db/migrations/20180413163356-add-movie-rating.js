'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Movies', 'rating', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Movies', 'rating');
  }
};
