'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistItem = sequelize.define('PlaylistItem', {}, {});
  PlaylistItem.associate = function(models) {
    PlaylistItem.belongsTo(models.Playlist,
      {foreignKey: 'id', sourceKey: 'playlistId'});
    PlaylistItem.belongsTo(models.Movie,
      {foreignKey: 'id', sourceKey: 'movieId'});
  };
  return PlaylistItem;
};