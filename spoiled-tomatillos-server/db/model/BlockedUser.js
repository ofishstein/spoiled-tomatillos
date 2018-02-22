const Sequelize = require('sequelize');
const db = require('../db');

const User = require('User');

const session = db.get_session();

const BlockedUser = session.define('blocked_users', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
  blockerId: {
    type: Sequelize.INTEGER,
    references: {model: User, key: 'id'},
  },
  blockeeId: {
    type: Sequelize.INTEGER,
    references: {model: User, key: 'id'},
  },
});

module.exports = BlockedUser;
