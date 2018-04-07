const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
const request = require('supertest');

const db = require('../db/db');
const session = db.get_session();

const testData = require('./testData');
const login = {username: 'test_user1', password: 'test'};
const adminLogin = {username: 'test_admin', password: 'test'};

const authenticatedUser = request.agent(app);
const authenticatedAdmin = request.agent(app);

describe('Profile Related Endpoints', () => {
  before((done) => {
    // setup db
    session.User.bulkCreate(testData.users).then(() => {
      session.Movie.bulkCreate(testData.movies).then(() => {
        session.Review.bulkCreate(testData.reviews).then(() => {
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

  after((done) => {
    // teardown db
    session.Review.destroy({where: {}}).then(() => {
      session.Movie.destroy({where: {}}).then(() => {
        session.User.destroy({where: {}}).then(() => {
          done();
        });
      });
    });
  });


  describe('GET review', () => {
    it('It should return the review by id', (done) => {
      authenticatedUser.get('/api/reviews/' + testData.reviews[0].id)
        .end((err, res) => {
          expect(res).to.have.status(200);

          expect(res.body).to.have.property('text');
          expect(res.body.text).to.equal(testData.reviews[0].text);
          expect(res.body).to.have.property('rating');
          expect(res.body.rating).to.equal(testData.reviews[0].rating);
          expect(res.body).to.have.property('userId');
          expect(res.body).to.have.property('movieId');

          done();
        });
    });
  });

  describe('POST flag review', () => {
    it('It should flag the review', (done) => {
      authenticatedUser.get('/api/reviews/' + testData.reviews[0].id)
        .end((err, res) => {
          expect(res).to.have.status(200);

          // Check that review starts out unflagged
          expect(res.body).to.have.property('flagged');
          expect(res.body.flagged).to.equal(false);

          authenticatedUser.post('/api/reviews/' + testData.reviews[0].id + '/flag')
            .end((err, res) => {
              expect(res).to.have.status(200);

              authenticatedUser.get('/api/reviews/' + testData.reviews[0].id)
                .end((err, res) => {
                  expect(res).to.have.status(200);

                  // Check that review is now flagged
                  expect(res.body).to.have.property('flagged');
                  expect(res.body.flagged).to.equal(true);

                  done();
                });
            });
        });
    });
  });

  describe('POST unflag review', () => {
    it('It should unflag the review', (done) => {
      authenticatedAdmin.get('/api/reviews/' + testData.reviews[0].id)
        .end((err, res) => {
          expect(res).to.have.status(200);

          // Check that review starts out flagged
          expect(res.body).to.have.property('flagged');
          expect(res.body.flagged).to.equal(true);

          authenticatedAdmin.post('/api/reviews/' + testData.reviews[0].id + '/unflag')
            .end((err, res) => {
              expect(res).to.have.status(200);

              authenticatedAdmin.get('/api/reviews/' + testData.reviews[0].id)
                .end((err, res) => {
                  expect(res).to.have.status(200);

                  // Check that review is now unflagged
                  expect(res.body).to.have.property('flagged');
                  expect(res.body.flagged).to.equal(false);

                  done();
                });
            });
        });
    });
  });
});
