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

  const movieToAdd = {
    id: 105,
    imdbId: 371746,
    tmdbId: 1726,
    title: 'Iron Man (2008)',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const movieToPut = {
    id: 105,
    imdbId: 1228705,
    tmdbId: 10138,
    title: 'Iron Man 2 (2010)',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const malformedMovieToAdd = {
    id: 106,
    imdbId: 'ThisIsNotAnInteger',
    tmdbId: 1726,
    title: 'Iron Man (2008)',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  describe('Regular User should not have access to admin-only endpoints', () => {
    it('It should return 401 for movie POST', (done) => {
      authenticatedUser.post('/api/movies').send(movieToAdd).end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
    });

    it('It should return 401 for movie PUT', (done) => {
      authenticatedUser.put('/api/movies/101').send({...movieToAdd, id: 101}).end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
    });

    it('It should return 401 for movie DELETE', (done) => {
      authenticatedUser.delete('/api/movies/101').end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
    });
  });

  describe('Admin POST new movie should work as intended for well-formed and ill-formed movies', () => {
    it('It should create a movie from well-formed input', (done) => {
      authenticatedAdmin.post('/api/movies').send(movieToAdd).end((err, res) => {
        expect(res).to.have.status(200);
        authenticatedAdmin.get('/api/movies/' + movieToAdd.id).end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.title).to.equal(movieToAdd.title);
          done();
        });
      });
    });

    it('It should return a 400 error when posting ill-formed movie', (done) => {
      authenticatedAdmin.post('/api/movies').send(malformedMovieToAdd).end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
  });

  describe('Admin PUT movie should work as intended', () => {
    it('It should correctly change the movie properties when logged in', (done) => {
      authenticatedAdmin.put('/api/movies/' + movieToPut.id).send(movieToPut).end((err, res) => {
        expect(res).to.have.status(200);
        authenticatedAdmin.get('/api/movies/' + movieToPut.id).end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.title).to.equal(movieToPut.title);
          done();
        });
      });
    });

    it('It should return a 400 when attempting to PUT malformed data', (done) => {
      authenticatedAdmin.put('/api/movies/' + malformedMovieToAdd.id).send(malformedMovieToAdd).end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
  });

  describe('Admin DELETE movie should work as intended', () => {
    it('It should remove the movie when logged in as admin', (done) => {
      authenticatedAdmin.delete('/api/movies/' + movieToAdd.id).end((err, res) => {
        expect(res).to.have.status(200);
        authenticatedAdmin.get('/api/movies/' + movieToAdd.id).end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });
});