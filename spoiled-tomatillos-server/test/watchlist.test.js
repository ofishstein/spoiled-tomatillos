const chai = require('chai');
const app = require('../app');

const expect = chai.expect;
const request = require('supertest');

const db = require('../db/db');
const session = db.get_session();

const testData = require('./testData');
let login = {username: 'test_user1', password: 'test'};
let authenticatedUser = request.agent(app);

describe('Watchlist Tests', () => {
  before((done) => {
    // setup db
    session.User.bulkCreate(testData.users).then(() => {
      session.Movie.bulkCreate(testData.movies).then(() => {
        // login
        authenticatedUser
          .post('/api/login')
          .send(login)
          .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });

  after((done) => {
    // teardown db
    session.WatchlistItem.destroy({where: {}}).then(() => {
      session.User.destroy({where: {}}).then(() => {
        session.Movie.destroy({where: {}}).then(() => {
          done();
        });
      });
    });
  });

  it('should be initialized with test_user1 having 0 items in watchlist', (done) => {
    authenticatedUser.get('/api/users/101/watchlist')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('watchlist');
        expect(res.body['watchlist'].length).to.eql(0);
        done();
      });
  });

  it('should return 404 if getting a nonexistent user\'s watchlist', (done) => {
    authenticatedUser.get('/api/users/123/watchlist')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.eql({error: 'userId not found'});
        done();
      });
  });

  it('should return 400 when adding a nonexistent movie to watchlist', (done) => {
    authenticatedUser.post('/api/users/101/watchlist')
      .send({movieId: 1298})
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return 401 if not correct user logged in for add or remove', (done) => {
    authenticatedUser.post('/api/users/102/watchlist')
      .send({movieId: 101})
      .end((err, res) => {
        expect(res).to.have.status(401);

        authenticatedUser.delete('/api/users/102/watchlist')
          .send({movieId: 101})
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
          });
      });
  });

  it('should successfully add movie to test_user1 watchlist when logged in', (done) => {
    authenticatedUser.post('/api/users/101/watchlist')
      .send({movieId: 101})
      .end((err, res) => {
        expect(res).to.have.status(200);

        // check test_user1 watchlist not empty
        authenticatedUser.get('/api/users/101/watchlist')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('watchlist');
            expect(res.body['watchlist'].length).to.eql(1);
            expect(res.body['watchlist'][0]['Movie']['id']).to.eql(101);
            done();
          });
      });
  });

  it('should successfully remove movie from watchlist', (done) => {
    authenticatedUser.delete('/api/users/101/watchlist')
      .send({movieId: 101})
      .end((err, res) => {
        expect(res).to.have.status(200);

        // check test_user1 watchlist now empty
        authenticatedUser.get('/api/users/101/watchlist')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('watchlist');
            expect(res.body['watchlist'].length).to.eql(0);
            done();
          });
      });
  });
});