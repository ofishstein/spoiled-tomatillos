module.exports = (session, DataTypes) => {
  const User = session.define('users', {

    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    is_admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    username: { type: DataTypes.STRING(255), unique: true },
    email: { type: DataTypes.STRING(255), unique: true },
    password: DataTypes.STRING(255),
    first_name: DataTypes.STRING(63),
    last_name: DataTypes.STRING(63),
  },
  {// don't forget to enable timestamps!
    createdAt: 'create_time',
    updatedAt: false,
    underscored: true
  }
  );
  return User;
}
