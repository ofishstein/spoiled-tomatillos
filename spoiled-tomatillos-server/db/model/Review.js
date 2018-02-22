const Sequelize = require('sequelize');
const db = require('../db');
const User = require('User');
const Movie = require('Movie');

const session = db.get_session();

const Review = session.define('reviews', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
  userId: {
    type: Sequelize.INTEGER,
    references: {model: User, key: 'id'},
  },
  movieId: {
    type: Sequelize.INTEGER,
    references: {model: Movie, key: 'id'},
  },
  text: Sequelize.TEXT,
  rating: Sequelize.INTEGER,
});

module.exports = Review;
