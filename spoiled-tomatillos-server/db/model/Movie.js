const Sequelize = require('sequelize');
const db = require('../db');

const session = db.get_session();

const Movie = session.define('movies', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
  name: { type: Sequelize.STRING(255), unique: true },
  description: Sequelize.TEXT,
  productionInfo: Sequelize.TEXT,
  img: Sequelize.String(255),
});

module.exports = Movie;
