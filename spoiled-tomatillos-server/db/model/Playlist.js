const User = require('./User.js');
const Movie = require('./Movie.js');

module.exports = (session, DataTypes) => {
  const Playlist = session.define('playlists', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: {
      type: DataTypes.INTEGER,
      references: {model: User, key: 'id'},
    },
    name: DataTypes.STRING(127),
    description: DataTypes.TEXT,
  }, {underscored: true, timestamps: false});
  return Playlist;
}

