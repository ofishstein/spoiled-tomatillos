const db = require('../db/db');
const session = db.get_session();

const http = require('http');
const app = require('../app');
const apiKey = app.omdbApiKey;

const omdbBase = 'http://www.omdbapi.com/?apikey=' + apiKey + '&';

let omdb = {};

// Search movies by keyword and return json results of given page
omdb.searchByKeyword = (keyword, page) => {
    http.get(omdbBase + 's=' + keyword + '&page=' + page)
        .then(movies => {
            return movies;
        });
};

// Get a movie by imdb id and return json results
// if save is true, save the poster to db (checked if null in original db query)
omdb.getMovieById = (id, save) => {
    http.get(omdbBase + 'plot=full&i=' + id)
        .then(movie => {
            if (save) {
                session.Movie.update(
                    { poster: movie.poster },
                    {
                        where: { imdbId: id }
                    })
                    .then(ret => {
                        return movie;
                    });
            } else {
                return movie;
            }
        });
};

// Get a movie's poster image by imdb id and save to db
omdb.getPosterById = (id) => {
    http.get(omdbBase + 'i=' + id)
        .then(movie => {
            session.Movie.update(
                { poster: movie.poster },
                {
                    where: { imdbId: id }
                })
                .then(ret => {
                    return movie.poster;
                });
        });
};

module.exports.omdb = () => omdb;