const Movie = require('./Movie.js');

module.exports = (session, DataTypes) => {
  const AffiliateCode = session.define('affiliate_codes', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {model: Movie, key: 'id'},
    },
    code: DataTypes.STRING(255),
    provider: DataTypes.STRING(255),
  },
  { underscored: true, timestamps: false});
  return AffiliateCode;
};
