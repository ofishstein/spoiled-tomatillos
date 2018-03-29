const db = require('../db/db');
const session = db.get_session();

const request = require('request');
const app = require('../app');
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

// Search movies by keyword and return json results of given page
omdb.searchByKeyword = (keyword, page, callback) => {
    request.get(omdbBase + 's=' + keyword + '&page=' + page, {json: true},
        (err, res, body) => {
        if (err) {
            return callback({Error: err});
        }
        return callback(body);
    });
};

// Get a movie by imdb id and return json results
// if save is true, save the poster to db (checked if null in original db query)
omdb.getMovieById = (id, save, callback) => {
    let movie;
    // TODO: are all imported movielens imdb ID's 6 digits? (determine omdb prefix)
    request.get(omdbBase + 'plot=full&i=tt0' + id, {json: true},
        (err, res, body) => {
        if (err) {
            return callback({Error: err});
        }
        if (save) {
            session.Movie.update(
                { poster: body.Poster },
                {
                    where: { imdbId: id }
                })
                .then(ret => { });
        }
        movie = body;
        return callback(body);
    });
};

// Get a movie's poster image by imdb id and save to db
omdb.getPosterById = (id, callback) => {
    request.get(omdbBase + 'i=tt0' + id, {json: true},
        (err, res, body) => {
        if (err) {
            return callback({Error: err});
        }
        session.Movie.update(
            { poster: body.Poster },
            {
                where: { imdbId: id }
            })
            .then(ret => { });
        return callback(body.Poster);
    });
};

module.exports = omdb;