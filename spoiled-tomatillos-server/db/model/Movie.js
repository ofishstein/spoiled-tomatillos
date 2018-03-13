module.exports = (session, DataTypes) => {
  const Movie = session.define('movies', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    imdb_id: DataTypes.STRING(255),
    primary_title: DataTypes.STRING(255),
    original_title: DataTypes.STRING(255),
    year: DataTypes.INTEGER,
    runtime_min: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    imdb_rating: DataTypes.DOUBLE
  }, {timestamps: false, underscored: true});
  return Movie;
}

