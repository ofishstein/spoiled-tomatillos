const Movie = require('./Movie.js');
const Playlist = require('./Playlist.js');
const Review = require('./Review.js');
const User = require('./User.js');

module.exports = (session, DataTypes) => {
  const PlaylistComment = session.define('playlist_comments', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    text: DataTypes.TEXT,
    commenter_id: {
      type: DataTypes.INTEGER,
      references: {model: User, key: 'id'},
    },
    playlist_user_id: {
      type: DataTypes.INTEGER,
      references: {model: User, key: 'id'},
    },
    playlist_id: {
      type: DataTypes.INTEGER,
      references: {model: Playlist, key: 'id'},
    },
  },
  { underscored: true, timestamps: false});
  return PlaylistComment;
}

