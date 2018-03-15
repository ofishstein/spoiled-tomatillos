'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        return new Promise(((resolve, reject) => {
          bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) return reject(err);
            user.password = hash;
            resolve(hash);
          });
        }));
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Review,
      {as: 'Reviews', foreignKey: 'id', sourceKey: 'userId'});
    User.hasMany(models.Playlist,
      {as: 'Playlists', foreignKey: 'id', sourceKey: 'userId'});
    User.hasMany(models.PlaylistComment,
      {as: 'PlaylistComments', foreignKey: 'id', sourceKey: 'commenterId'});
    User.hasMany(models.ReviewComment,
      {as: 'ReviewComments', foreignKey: 'id', sourceKey: 'commenterId'});
    User.hasMany(models.Recommendation,
      {as: 'RecommendationsSent', foreignKey: 'id', sourceKey: 'recommenderId'});
    User.hasMany(models.Recommendation,
      {as: 'RecommendationsReceived', foreignKey: 'id', sourceKey: 'recommendeeId'});
    User.hasMany(models.BlockedUser,
      {as: 'BlockedUsers', foreignKey: 'id', sourceKey: 'blockerId'});
    User.hasMany(models.BlockedUser,
      {as: 'BlockedByUsers', foreignKey: 'id', sourceKey: 'blockeeId'});
  };
  User.prototype.validatePassword = (suppliedPassword, userPassword) => {
    return new Promise(((resolve, reject) => {
      bcrypt.compare(suppliedPassword, userPassword, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    }));
  };
  return User;
};