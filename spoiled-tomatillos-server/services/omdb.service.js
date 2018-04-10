const rp = require('request-promise');
// TODO: move to process env
const apiKey = '3f811d1c';

const omdbBase = 'http://www.omdbapi.com/?apikey=' + apiKey + '&';

let omdb = {};

/**
 * OMDB responses can return regular errors (like 401, etc.),
 * or, if some query param is incorrect (such as the id is incorrect),
 * the response will be a 200 of the format
 *      {Response: 'False', Error: 'error message...'}
 */

// Search movies by keyword and return json results of given page, returns promise
omdb.searchByKeyword = (keyword, page) => {
  return rp.get({uri: omdbBase + 's=' + keyword + '&page=' + page, json: true});
};

// Get a movie by imdb id and return json results, returns promise
omdb.getMovieById = (id) => {
  id = '000000' + id;
  return rp.get({uri: omdbBase + 'plot=full&i=tt' + id.slice(-7), json: true});
};

// Get a movie's poster image by imdb id, returns promise
omdb.getPosterById = (id) => {
  id = '000000' + id;
  return rp.get({uri: omdbBase + 'i=tt' + id.slice(-7), json: true});
};

module.exports = omdb;