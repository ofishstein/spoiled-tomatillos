const Sequelize = require('sequelize');
const db = require('../db');

const Movie = require('Movie');
const Playlist = require('Playlist');
const Review = require('Review');
const User = require('User');

session = db.get_session();

const PlaylistComment = session.define('playlist_comments', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
  text: Sequelize.TEXT,
  commenterId: {
    type: Sequelize.INTEGER,
    references: {model: User, key: 'id'},
  },
  playlistUserId: {
    type: Sequelize.INTEGER,
    references: {model: User, key: 'id'},
  },
  playlistId: {
    type: Sequelize.INTEGER,
    references: {model: Playlist, key: 'id'},
  },
});

const ReviewComment = session.define('review_comments', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
  text: Sequelize.TEXT,
  commenterId: {
    type: Sequelize.INTEGER,
    references: {model: User, key: 'id'},
  },
  reviewUserId: {
    type: Sequelize.INTEGER,
    references: {model: User, key: 'id'},
  },
  reviewId: {
    type: Sequelize.INTEGER,
    references: {model: Review, key: 'id'},
  },
  movieId: {
    type: Sequelize.INTEGER,
    references: {model: Movie, key: 'id'},
  },
});

module.exports = {'PlaylistComment': PlaylistComment, 'ReviewComment': ReviewComment};
