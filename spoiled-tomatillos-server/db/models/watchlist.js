'use strict';
module.exports = (sequelize, DataTypes) => {
  const Watchlist = sequelize.define('Watchlist', {
    name: DataTypes.STRING
  }, {});
  Watchlist.associate = function(models) {
    Watchlist.belongsTo(models.User, {foreignKey: 'id', sourceKey: 'userId'});
    Watchlist.hasMany(models.WatchlistItem,
      {as: 'Items', sourceKey: 'id', foreignKey: 'watchlistId'});
    Watchlist.hasMany(models.WatchlistComment,
      {as: 'Comments', sourceKey: 'id', foreignKey: 'watchlistId'});
  };
  return Watchlist;
};
