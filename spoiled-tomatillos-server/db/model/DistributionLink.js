const Movie = require('./Movie.js');

module.exports = (session, DataTypes) => {
  const DistributionLink = session.define('distribution_links', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {model: Movie, key: 'id'},
    },
    link: DataTypes.STRING(255),
  },
  { underscored: true, timestamps: false});
  return DistributionLink;
}
