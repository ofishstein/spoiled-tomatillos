const Sequelize = require('sequelize');
const db = require('../db');

const Movie = require('Movie');
const Playlist = require('Playlist');
const User = require('User');

const session = db.get_session();

const PlaylistItem = session.define('playlist_items', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
  playlistUserId: {
    type: Sequelize.INTEGER,
    references: {model: User, key: 'id'},
  },
  playlistId: {
    type: Sequelize.INTEGER,
    references: {model: Playlist, key: 'id'},
  },
  movieId: {
    type: Sequelize.INTEGER,
    references: {model: Movie, key: 'id'},
  },
});

module.exports =  PlaylistItem;
