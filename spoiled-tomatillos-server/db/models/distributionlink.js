'use strict';
module.exports = (sequelize, DataTypes) => {
  const DistributionLink = sequelize.define('DistributionLink', {
    link: DataTypes.STRING
  }, {});
  DistributionLink.associate = function(models) {
    DistributionLink.belongsTo(models.Movie,
      {foreignKey: 'id', sourceKey: 'movieId'});
  };
  return DistributionLink;
};