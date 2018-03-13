const Movie = require('./Movie.js');
const Playlist = require('./Playlist.js');
const User = require('./User.js');

module.exports =  (session, DataTypes) => {

  const PlaylistItem = session.define('playlist_items', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    playlist_user_id: {
      type: DataTypes.INTEGER,
      references: {model: User, key: 'id'},
    },
    playlist_id: {
      type: DataTypes.INTEGER,
      references: {model: Playlist, key: 'id'},
    },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {model: Movie, key: 'id'},
    },
  }, { underscored: true, timestamps: false });
  return PlaylistItem;
}

