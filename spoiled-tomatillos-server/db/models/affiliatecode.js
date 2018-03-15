'use strict';
module.exports = (sequelize, DataTypes) => {
  const AffiliateCode = sequelize.define('AffiliateCode', {
    code: DataTypes.STRING,
    provider: DataTypes.STRING
  }, {});
  AffiliateCode.associate = function(models) {
    AffiliateCode.belongsTo(models.Movie,
      {foreignKey: 'id', sourceKey: 'movieId'});
  };
  return AffiliateCode;
};