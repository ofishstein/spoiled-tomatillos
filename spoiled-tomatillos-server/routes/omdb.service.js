const http = require('http');
const app = require('app');
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
omdb.getMovieById = (id) => {
    http.get(omdbBase + 'plot=full&i=' + id)
        .then(movie => {
            return movie;
        });
};

// Get a movie's poster image by imdb id
omdb.getPosterById = (id) => {
    http.get(omdbBase + 'i=' + id)
        .then(movie => {
            return movie.Poster;
        });
};

module.exports(omdb);