const User = require('./User.js');
const Movie = require('./Movie.js');

module.exports = (session, DataTypes) => {
  const Recommendation = session.define('recommendations', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    recommender_id: {
      type: DataTypes.INTEGER,
      references: {model: User, key: 'id'},
    },
    recommendee_id: {
      type: DataTypes.INTEGER,
      references: {model: User, key: 'id'},
    },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {model: Movie, key: 'id'},
    },
    message: DataTypes.TEXT,
  }, { underscored: true, timestamps: false });
  return Recommendation;
};

