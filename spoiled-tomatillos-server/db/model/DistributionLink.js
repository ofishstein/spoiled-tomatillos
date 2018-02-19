const Sequelize = require('sequelize');
const db = require('../db');
const Movie = require('Movie');

session = db.get_session();

const DistributionLink = session.define('distribution_links', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
  movieId: {
    type: Sequelize.INTEGER,
    references: {model: Movie, key: 'id'},
  },
  link: Sequelize.STRING(255),
});

module.exports = DistributionLink;
