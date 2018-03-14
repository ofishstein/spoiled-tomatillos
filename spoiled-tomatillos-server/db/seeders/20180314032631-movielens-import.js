'use strict';

const fs  = require('fs');
const parse = require('csv-parse/lib/sync');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const movies = parse(fs.readFileSync('movies.csv', 'utf8'), {from: 2});
    const moviesToInsert = movies.map((line) => {
      let movie = {};
      movie.id = line[0];
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
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
