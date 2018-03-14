'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistComment = sequelize.define('PlaylistComment', {
    text: DataTypes.STRING
  }, {});
  PlaylistComment.associate = function(models) {
    PlaylistComment.belongsTo(models.User,
      {foreignKey: 'id', sourceKey: 'commenterId'});
    PlaylistComment.belongsTo(models.Playlist,
      {foreignKey: 'id', sourceKey: 'playlistId'});
  };
  return PlaylistComment;
};