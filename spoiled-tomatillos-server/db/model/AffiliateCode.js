const Sequelize = require('sequelize');
const db = require('../db');
const Movie = require('Movie');

session = db.get_session();

const AffiliateCode = session.define('affiliate_codes', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
  movieId: {
    type: Sequelize.INTEGER,
    references: {model: Movie, key: 'id'},
  },
  code: Sequelize.STRING(255),
  provider: Sequelize.STRING(255),
});

module.exports = AffiliateCode;
