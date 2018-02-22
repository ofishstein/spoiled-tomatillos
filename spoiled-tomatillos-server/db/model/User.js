const Sequelize = require('sequelize');
const db = require('../db');

const session = db.get_session();

const User = session.define('users', {

  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  isAdmin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_admin'},
  username: { type: Sequelize.STRING(255), unique: true },
  email: { type: Sequelize.STRING(255), unique: true },
  password: Sequelize.STRING(255),
  first: { type: Sequelize.STRING(63), field: 'first_name' },
  last: { type: Sequelize.STRING(63), field: 'last_name' }
},
{// don't forget to enable timestamps!
  createdAt: 'create_time',
  updatedAt: false
}
);

module.exports = User;
