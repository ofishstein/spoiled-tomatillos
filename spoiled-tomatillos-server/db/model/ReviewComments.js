const Movie = require('./Movie.js');
const Review = require('./Review.js');
const User = require('./User.js');

module.exports = (session, DataTypes) => {
  const ReviewComment = session.define('review_comments', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    text: DataTypes.TEXT,
    commenter_id: {
      type: DataTypes.INTEGER,
      references: {model: User, key: 'id'},
    },
    review_user_id: {
      type: DataTypes.INTEGER,
      references: {model: User, key: 'id'},
    },
    review_id: {
      type: DataTypes.INTEGER,
      references: {model: Review, key: 'id'},
    },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {model: Movie, key: 'id'},
    },
  },
  { underscored: true, timestamps: false});
  return ReviewComment;
};
