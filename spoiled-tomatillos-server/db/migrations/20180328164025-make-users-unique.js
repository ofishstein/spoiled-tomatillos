'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
            queryInterface.changeColumn('Users', 'email', {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
            }),
            queryInterface.changeColumn('Users', 'username', {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
            }),
            queryInterface.changeColumn('Users', 'password', {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
            }),
            queryInterface.changeColumn('Users', 'firstName', {
              type: Sequelize.STRING,
              allowNull: false,
            }),
            queryInterface.changeColumn('Users', 'lastName', {
              type: Sequelize.STRING,
              allowNull: false,
            }),
            queryInterface.changeColumn('Users', 'isAdmin', {
              type: Sequelize.BOOLEAN,
              allowNull: false,
            }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
            queryInterface.changeColumn('Users', 'email', Sequelize.STRING),
            queryInterface.changeColumn('Users', 'password', Sequelize.STRING),
            queryInterface.changeColumn('Users', 'lastName', Sequelize.STRING),
            queryInterface.changeColumn('Users', 'firstName', Sequelize.STRING),
            queryInterface.changeColumn('Users', 'isAdmin', Sequelize.BOOLEAN),
            queryInterface.changeColumn('Users', 'username', Sequelize.STRING)]);
  }
};
