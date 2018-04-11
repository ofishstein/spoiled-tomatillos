'use strict';
const bcrypt = require('bcrypt');

function encryptPassword(user, options) {
  return new Promise(((resolve, reject) => {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return reject(err);
      user.password = hash;
      resolve(hash);
    });
  }));
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: DataTypes.STRING,
    preferredService: DataTypes.STRING,
    profileImageUrl: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }

  }, {
    hooks: {
      beforeCreate: (user, options) => {
        return encryptPassword(user, options);
      },
      beforeUpdate: (user, options) => {
        return encryptPassword(user, options);
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Review,
      {as: 'Reviews', sourceKey: 'id', foreignKey: 'userId'});
    User.hasMany(models.WatchlistItem,
      {as: 'WatchlistItems', sourceKey: 'id', foreignKey: 'userId'});
    User.hasMany(models.WatchlistComment,
      {as: 'WatchlistCommentsSent', sourceKey: 'id', foreignKey: 'commenterId'});
    User.hasMany(models.WatchlistComment,
      {as: 'WatchlistCommentsReceived', sourceKey: 'id', foreignKey: 'ownerId'});
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
    User.hasMany(models.Follower,
      {as: 'Following', sourceKey: 'id', foreignKey: 'followerId'});
    User.hasMany(models.Follower,
      {as: 'Followers', sourceKey: 'id', foreignKey: 'followeeId'});
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
