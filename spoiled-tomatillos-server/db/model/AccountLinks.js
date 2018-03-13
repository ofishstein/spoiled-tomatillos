const User = require('./User.js');

module.exports = (session, DataTypes) => {

  const AccountLink = session.define('account_links', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: {
      type: DataTypes.INTEGER,
      references: {model: User, key: 'id'},
    },
    link_type: DataTypes.STRING(255),
  },
  { underscored: true, timestamps: false});
  return AccountLink;
};

