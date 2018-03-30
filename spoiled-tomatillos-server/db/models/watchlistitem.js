'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatchlistItem = sequelize.define('WatchlistItem', {}, {});
  WatchlistItem.associate = function(models) {
    WatchlistItem.belongsTo(models.User,
      {foreignKey: 'id', sourceKey: 'userId'});
    WatchlistItem.belongsTo(models.Movie,
      {foreignKey: 'id', sourceKey: 'movieId'});
  };
  return WatchlistItem;
};
