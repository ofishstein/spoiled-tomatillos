const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const db = require('../db/db');
const session = db.get_session();
const testData = require('./testData');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
const request = require('supertest');

const login = {username: 'test_user1', password: 'test'};
const adminLogin = {username: 'test_admin', password: 'test'};

const authenticatedUser = request.agent(app);
const authenticatedAdmin = request.agent(app);


chai.use(chaiHttp);
describe('Movies endpoint', () => {
  before((done) => {
    session.Movie.bulkCreate(testData.movies).then(() => {
      session.User.bulkCreate(testData.users).then(() => {
        session.Review.bulkCreate(testData.reviews).then(() => {
          session.WatchlistItem.bulkCreate(testData.watchlistItems).then(() => {
            // login regular user
            authenticatedUser
              .post('/api/login')
              .send(login)
              .end(function (err, res) {
                expect(res).to.have.status(200);
                // login admin user
                authenticatedAdmin
                  .post('/api/login')
                  .send(adminLogin)
                  .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                  });
              });
          });
        });
      });
    });
  });

  after((done) => {
    const movieIds = testData.movies.map((movie) => movie.id);
    const userIds = testData.users.map((user) => user.id);
    const reviewIds = testData.reviews.map((review) => review.id);
    session.Review.destroy({where: {id: reviewIds}}).then(() => {
      session.Movie.destroy({where: {id: movieIds}}).then(() => {
        session.User.destroy({where: {id: userIds}}).then(() => {
          done();
        });
      });
    });
  });

  describe('GET movie search - results', () => {
    let response;
    before((done) => {
      chai.request(app).get('/api/movies?title=' + testData.movies[0].title).end((err, res) => {
        response = res;
        done();
      });
    });
    it('It should return at least one result for a movie search', (done) => {
      response.should.have.status(200);
      response.body.should.have.length.above(0);
      response.body[0].should.have.property('id');
      response.body[0].id.should.equal(testData.movies[0].id);
      done();
    });
    it('It should have a valid poster from imdb', (done) => {
      response.body[0].should.have.property('poster');
      response.body[0].poster.should.equal('https://images-na.ssl-images-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg');
      done();
    });
  });

  describe('GET movie search - no results', () => {
    it('It should return no results', (done) => {
      chai.request(app).get('/api/movies?title=notAValidTitle').end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.length(0);
        done();
      });
    });
  });

  describe('GET movie information', () => {
    describe('It should return a movie information object', () => {
      let response;
      before((done) => {
        chai.request(app).get('/api/movies/' + testData.movies[0].id).end((err, res) => {
          response = res;
          done();
        });
      });
      it('It should have movie info from the local database', (done) => {
        response.should.have.status(200);
        response.body.should.have.property('id');
        response.body.id.should.equal(testData.movies[0].id);
        response.body.should.have.property('imdbId');
        response.body.imdbId.should.equal(testData.movies[0].imdbId);
        response.body.should.have.property('tmdbId');
        response.body.tmdbId.should.equal(testData.movies[0].tmdbId);
        response.body.should.have.property('title');
        response.body.title.should.equal(testData.movies[0].title);
        done();
      });
      it('It should have a poster url and average rating', (done) => {
        response.body.should.have.property('poster');
        response.body.should.have.property('rating');
        // reviews bulk created, so review afterCreate hooks not hit to update movie rating
        expect(response.body['rating']).to.eql(null);
        done();
      });
      it('It should have movie info from omdb', (done) => {
        response.body.should.have.property('Rated');
        response.body.should.have.property('Released');
        response.body.should.have.property('Runtime');
        done();
      });
    });
  });

  describe('GET non-existant movie', () => {
    it('It should return 404', (done) => {
      chai.request(app).get('/api/movies/0').end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });
  });

  describe('GET movie reviews by movie id', () => {
    it('It should return reviews for a movie', (done) => {
      chai.request(app).get('/api/movies/' + testData.movies[0].id + '/reviews').end((err, res) => {
        res.should.have.status(200);
        const expectedReviews = testData.reviews.filter((r) => r.movieId === testData.movies[0].id);
        expectedReviews.should.have.length.above(0);
        res.body.should.have.length(expectedReviews.length);
        done();
      });
    });
  });

  describe('POST movie review', () => {
    it('It should successfully post a movie review', (done) => {
      authenticatedUser.post('/api/movies/103/review')
        .send({
          rating: 4.5,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('It should update the average movie rating after posting new review', (done) => {
      authenticatedUser.get('/api/movies/103')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('rating');
          expect(res.body['rating']).to.eql('3.50');
          done();
        });
    });
  });

  describe('GET movie where movie is in user\'s watchlist', () => {
    it('It should return true for inWatchlist', (done) => {
      authenticatedUser.get('/api/movies/102').end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('inWatchlist');
        expect(res.body.inWatchlist).to.equal(true);
        done();
      });
    });
  });

  describe('GET movie where movie is NOT in user\'s watchlist', () => {
    it('It should return false for inWatchlist', (done) => {
      authenticatedUser.get('/api/movies/101').end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('inWatchlist');
        expect(res.body.inWatchlist).to.equal(false);
        done();
      });
    });
  });
});