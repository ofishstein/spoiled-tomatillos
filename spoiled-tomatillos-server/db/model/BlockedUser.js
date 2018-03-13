const User = require('./User.js');

module.exports = (session, DataTypes) => {

  const BlockedUser = session.define('blocked_users', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    blocker_id: {
      type: DataTypes.INTEGER,
      references: {model: User, key: 'id'},
    },
    blockee_id: {
      type: DataTypes.INTEGER,
      references: {model: User, key: 'id'},
    },
  },
  { underscored: true, timestamps: false});
  return BlockedUser;
};

