const Sequelize = require('sequelize');
const db = require('../db');
const User = require('User');
const Movie = require('Movie');

const session = db.get_session();

const Playlist = session.define('playlists', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
  userId: {
    type: Sequelize.INTEGER,
    references: {model: User, key: 'id'},
  },
  name: Sequelize.STRING(127),
  description: Sequelize.TEXT,
});

module.exports = Playlist;
