'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatchlistComment = sequelize.define('WatchlistComment', {
    text: DataTypes.STRING
  }, {});
  WatchlistComment.associate = function(models) {
    WatchlistComment.belongsTo(models.User,
      {foreignKey: 'id', sourceKey: 'commenterId'});
    WatchlistComment.belongsTo(models.User,
      {foreignKey: 'id', sourceKey: 'ownerId'});
  };
  return WatchlistComment;
};
