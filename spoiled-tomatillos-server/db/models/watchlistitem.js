'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatchlistItem = sequelize.define('WatchlistItem', {}, {});
  WatchlistItem.associate = function(models) {
    WatchlistItem.belongsTo(models.User,
      {sourceKey: 'id', foreignKey: 'userId', as: 'User'});
    WatchlistItem.belongsTo(models.Movie,
      {sourceKey: 'id', foreignKey: 'movieId', as: 'Movie'});
  };
  return WatchlistItem;
};
