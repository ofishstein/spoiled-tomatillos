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

describe('Recommendation Related Endpoints', () => {
  before((done) => {
    // setup db
    session.User.bulkCreate(testData.users).then(() => {
      session.Movie.bulkCreate(testData.movies).then(() => {
        session.Recommendation.bulkCreate(testData.recommendations).then(() => {
          session.Follower.bulkCreate(testData.followers).then(() => {
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
    // teardown db
    session.Follower.destroy({where: {}}).then(() => {
      session.Recommendation.destroy({where: {}}).then(() => {
        session.Movie.destroy({where: {}}).then(() => {
          session.User.destroy({where: {}}).then(() => {
            done();
          });
        });
      });
    });
  });

  describe('POST Recommendation for friend', () => {
    it('should create a new recommendation', done => {
      authenticatedUser
      .post('/api/recommendations')
      .send([{movieId: 101, recommendeeId: 102, message: "Ahoy!"}])
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  describe('POST Recommendation for non friend', () => {
    it('should not create a new recommendation if not friends', done => {
      authenticatedUser
      .post('/api/recommendations')
      .send([{'movieId': 101, 'recomendeeId': 103}])
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
    });
  });

  describe('GET recommendation by id', () => {
    it('should get recommendation information by id', (done) => {
      authenticatedUser.get('/api/recommendations/' + testData.recommendations[0].id).end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.equal(testData.recommendations[0].id);
        expect(res.body).to.have.property('Recommender');
        expect(res.body.Recommender.id).to.equal(testData.recommendations[0].recommenderId);
        expect(res.body).to.have.property('Recommendee');
        expect(res.body.Recommendee.id).to.equal(testData.recommendations[0].recommendeeId);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal(testData.recommendations[0].message);

        done();
      });
    });
  });

  describe('DELETE recommendation should succeed for owning user', () => {
    it('should delete the recommendation', (done) => {
      authenticatedUser.delete('/api/recommendations/' + testData.recommendations[0].id).end((err, res) => {
        expect(res).to.have.status(200);

        // Check that review is actually deleted
        authenticatedUser.get('/api/recommendations/' + testData.recommendations[0].id).end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });

  describe('DELETE recommendation should succeed for admin user', () => {
    it('should delete the recommendation', (done) => {
      authenticatedAdmin.delete('/api/recommendations/' + testData.recommendations[1].id).end((err, res) => {
        expect(res).to.have.status(200);

        // Check that review is actually deleted
        authenticatedUser.get('/api/recommendations/' + testData.recommendations[1].id).end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });
});
