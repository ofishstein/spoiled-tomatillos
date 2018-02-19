const Sequelize = require('sequelize');
const db = require('../db');
const User = require('User');
const Movie = require('Movie');

const session = db.get_session();

const Recommendation = session.define('recommendations', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
  recommenderId: {
    type: Sequelize.INTEGER,
    references: {model: User, key: 'id'},
  },
  recommendeeId: {
    type: Sequelize.INTEGER,
    references: {model: User, key: 'id'},
  },
  movieId: {
    type: Sequelize.INTEGER,
    references: {model: Movie, key: 'id'},
  },
  message: Sequelize.TEXT,
});

module.exports = Recommendation;
