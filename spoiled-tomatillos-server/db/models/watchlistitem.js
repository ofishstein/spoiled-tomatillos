'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatchlistItem = sequelize.define('WatchlistItem', {}, {});
  WatchlistItem.associate = function(models) {
    WatchlistItem.belongsTo(models.Watchlist,
      {foreignKey: 'id', sourceKey: 'watchlistId'});
    WatchlistItem.belongsTo(models.Movie,
      {foreignKey: 'id', sourceKey: 'movieId'});
  };
  return WatchlistItem;
};
