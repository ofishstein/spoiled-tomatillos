'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlockedUser = sequelize.define('BlockedUser', {}, {});
  BlockedUser.associate = function(models) {
    BlockedUser.belongsTo(models.User,
      {as: 'Blocker', foreignKey: 'id', sourceKey: 'blockerId'});
    BlockedUser.belongsTo(models.User,
      {as: 'Blockee', foreignKey: 'id', sourceKey: 'blockeeId'});
  };
  return BlockedUser;
};