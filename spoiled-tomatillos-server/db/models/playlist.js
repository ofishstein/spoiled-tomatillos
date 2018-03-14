'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING
  }, {});
  Playlist.associate = function(models) {
    Playlist.belongsTo(models.User, {foreignKey: 'id', sourceKey: 'userId'});
    Playlist.hasMany(models.PlaylistItem,
      {as: 'Items', foreignKey: 'id', sourceKey: 'playlistId'});
    Playlist.hasMany(models.PlaylistComment,
      {as: 'Comments', foreignKey: 'id', sourceKey: 'playlistId'});
  };
  return Playlist;
};