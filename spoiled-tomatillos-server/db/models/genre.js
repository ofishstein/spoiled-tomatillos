'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    genre: DataTypes.STRING
  }, {});
  Genre.associate = function(models) {
    Genre.belongsTo(models.Movie, {foreignKey: 'id', sourceKey: 'movieId'});
  };
  return Genre;
};