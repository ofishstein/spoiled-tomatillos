'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.addColumn('Movies', 'rating', {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: null
      }),
      queryInterface.addColumn('Movies', 'reviewCount', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      })
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Movies', 'rating'),
      queryInterface.removeColumn('Movies', 'reviewCount')]);
  }
};
