'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
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
      {as: 'Reviews', sourceKey: 'id', foreignKey: 'userId'});
    User.hasMany(models.Playlist,
      {as: 'Playlists', sourceKey: 'id', foreignKey: 'userId'});
    User.hasMany(models.PlaylistComment,
      {as: 'PlaylistComments', sourceKey: 'id', foreignKey: 'commenterId'});
    User.hasMany(models.ReviewComment,
      {as: 'ReviewComments', sourceKey: 'id', foreignKey: 'commenterId'});
    User.hasMany(models.Recommendation,
      {as: 'RecommendationsSent', sourceKey: 'id', foreignKey: 'recommenderId'});
    User.hasMany(models.Recommendation,
      {as: 'RecommendationsReceived', sourceKey: 'id', foreignKey: 'recommendeeId'});
    User.hasMany(models.BlockedUser,
      {as: 'BlockedUsers', sourceKey: 'id', foreignKey: 'blockerId'});
    User.hasMany(models.BlockedUser,
      {as: 'BlockedByUsers', sourceKey: 'id', foreignKey: 'blockeeId'});
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