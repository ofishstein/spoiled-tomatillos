const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
let requester;

const db = require('../db/db');
const session = db.get_session();

const testData = require('./testData');

describe('Profile Related Endpoints', () => {
  before((done) => {
    // setup db
    session.User.bulkCreate(testData.users).then(() => {
      session.Movie.bulkCreate(testData.movies).then(() => {
        session.Follower.bulkCreate(testData.followers).then(() => {
          session.Review.bulkCreate(testData.reviews).then(() => {
            session.WatchlistItem.bulkCreate(testData.watchlistItems).then(() => {
              // keep server open for requests
              requester = chai.request(app).keepOpen();
              done();
            });
          });
        });
      });
    });
  });

  after((done) => {
    // teardown db
    session.WatchlistItem.destroy({where: {}}).then(() => {
      session.Review.destroy({where: {}}).then(() => {
        session.Follower.destroy({where: {}}).then(() => {
          session.Movie.destroy({where: {}}).then(() => {
            session.User.destroy({where: {}}).then(() => {
              // manually close server down
              requester.close();
              done();
            });
          });
        });
      });
    });
  });


  describe('GET user profile', () => {
    it('should get user, followers, following, watchlist, reviews, recent activity', (done) => {
      requester.get('/api/users/101')
        .end((err, res) => {
          expect(res).to.have.status(200);

          expect(res.body).to.have.property('followers');
          expect(res.body).to.have.property('following');
          expect(res.body).to.have.property('reviews');
          expect(res.body).to.have.property('activities');
          expect(res.body).to.have.property('username');
          expect(res.body).to.have.property('profileImageUrl');
          expect(res.body).to.have.property('watchlist');

          done();
        });
    });
  });

  describe('GET a user\'s reviews', () => {
    it('should return all of the user\'s reviews', (done) => {
      requester.get('/api/users/101/reviews')
        .end((err, res) => {
          expect(res).to.have.status(200);
          console.log(res.body);
          expect(res.body.Reviews.length).to.eql(2);

          expect(res.body.Reviews[0]).to.have.property('text');
          expect(res.body.Reviews[0]).to.have.property('rating');
          expect(res.body.Reviews[0]).to.have.property('Movie');
          expect(res.body.Reviews[0]['Movie']).to.have.property('poster');
          // expect(res.body[0]['Movie']['poster'] !== null).to.eql(true);

          done();
        });
    });
  });

  describe('GET a user that doesn\'t exist', () => {
    it('It should return a 404', (done) => {
      requester.get('/api/users/0').end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  describe('GET a user that doesn\'t exist\'s reviews', () => {
    it('It should return a 404', (done) => {
      requester.get('/api/users/0/reviews').end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
    });
  });


});