const Sequelize = require('sequelize');
const db = require('../db');
const User = require('User');

const session = db.get_session();

const AccountLink = session.define('account_links', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
  userId: {
    type: Sequelize.INTEGER,
    references: {model: User, key: 'id'},
  },
  linkType: Sequelize.STRING(255),
});

module.exports = AccountLink;
