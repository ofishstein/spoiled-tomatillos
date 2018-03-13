const User = require('./User.js');
const Movie = require('./Movie.js');

module.exports = (session, DataTypes) => {
  const Review = session.define('reviews', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    users_id: {
      type: DataTypes.INTEGER,
    },
    movies_id: {
      type: DataTypes.INTEGER,
    },
    text: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
  }, { timestamps: false, underscored: true});
  return Review;
}

