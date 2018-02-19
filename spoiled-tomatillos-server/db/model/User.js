const Sequelize = require('sequelize');
const db = require('../db');

const session = db.get_session();

const User = session.define('users', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: Sequelize.STRING(255), unique: true },
  email: { type: Sequelize.STRING(255), unique: true },
  password: Sequelize.STRING(255),
  first: Sequelize.STRING(63),
  last: Sequelize.STRING(63),
  preferences: Sequelize.TEXT,
});

module.exports = User;
