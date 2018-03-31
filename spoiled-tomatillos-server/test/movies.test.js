const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const db = require('../db/db');
const session = db.get_session();
const testData = require('./testData');
const should = chai.should();

chai.use(chaiHttp);
describe('Movies', () => {
  before((done) => {
    session.Movie.bulkCreate(testData.movies).then(() => {
      session.User.bulkCreate(testData.users).then(() => {
        session.Review.bulkCreate(testData.reviews).then(() => {done();});
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
    it('It should return at least one result for a movie search', (done) => {
      chai.request(app).get('/api/movies?title=' + testData.movies[0].title).end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.length.above(0);
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(testData.movies[0].id);
        done();
      });
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
    it('It should return a movie information object', (done) => {
      chai.request(app).get('/api/movies/' + testData.movies[0].id).end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('id');
        res.body.id.should.equal(testData.movies[0].id);
        res.body.should.have.property('imdbId');
        res.body.imdbId.should.equal(testData.movies[0].imdbId);
        res.body.should.have.property('tmdbId');
        res.body.tmdbId.should.equal(testData.movies[0].tmdbId);
        res.body.should.have.property('title');
        res.body.title.should.equal(testData.movies[0].title);
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
});