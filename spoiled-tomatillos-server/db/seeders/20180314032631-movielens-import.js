'use strict';

const fs  = require('fs');
const parse = require('csv-parse/lib/sync');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const movies = parse(fs.readFileSync('movies.csv', 'utf8'), {from: 2});
    const links  = parse(fs.readFileSync('links.csv', 'utf8'), {from: 2});
    const moviesToInsert = movies.map((line, i) => {
      let movie = {};
      movie.id = line[0];
      movie.imdbId = links[i][1];
      movie.tmdbId = links[i][2];
      movie.title = line[1];
      return movie;
    });
    const genresToInsert = movies.reduce((genres, line) => {
      line[2].split('|').forEach((g) => {
        genres.push({
          movieId: line[0],
          genre: g
        });
      });
      return genres;
    }, []);
    return Promise.all([queryInterface.bulkInsert('Movies', moviesToInsert),
      queryInterface.bulkInsert('Genres', genresToInsert)]);
  },

  down: (queryInterface, Sequelize) => {
    // TODO: Add removal for this seed
  }
};
