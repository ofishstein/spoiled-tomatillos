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
  // TODO: are all imported movielens imdb ID's 6 digits? (determine omdb prefix)
  return rp.get({uri: omdbBase + 'plot=full&i=tt0' + id, json: true});
};

// Get a movie's poster image by imdb id, returns promise
omdb.getPosterById = (id) => {
  return rp.get({uri: omdbBase + 'i=tt0' + id, json: true});
};

module.exports = omdb;