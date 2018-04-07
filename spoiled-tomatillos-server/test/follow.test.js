const chai = require('chai');
const app = require('../app');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = require('supertest');

const db = require('../db/db');
const session = db.get_session();

const testData = require('./testData');
let login = {username: 'test_user1', password: 'test'};
let authenticatedUser = request.agent(app);

describe('Follower Endpoints', () => {
  before(function (done) {
    // setup db
    session.User.bulkCreate(testData.users).then(() => {
      session.Follower.bulkCreate(testData.followers).then(() => {
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

  after(function (done) {
    // teardown db
    session.Follower.destroy({where: {}}).then(() => {
      session.User.destroy({where: {}}).then(() => {
        done();
      });
    });

  });

  describe('GET a user\'s followers', () => {
    it('should return all followers', (done) => {
      authenticatedUser.get('/api/users/101/followers')
        .end((err, res) => {
          expect(res).to.have.status(200);
          let data = JSON.parse(res.text);
          expect(data.length).to.eql(2);
          expect(data[0]).to.have.property('FollowerUser');
          expect(data[0]['FollowerUser']['username']).to.eql('test_user2');
          expect(data[1]['FollowerUser']['username']).to.eql('test_admin');
          done();
        });
    });
  });

  describe('GET user\'s following', () => {
    it('should return all following', (done) => {
      authenticatedUser.get('/api/users/101/following')
        .end((err, res) => {
          expect(res).to.have.status(200);
          let data = JSON.parse(res.text);
          expect(data.length).to.eql(1);
          expect(data[0]).to.have.property('FolloweeUser');
          expect(data[0]['FolloweeUser']['username']).to.eql('test_user2');
          done();
        });
    });
  });


  describe('Follow and unfollow a user', () => {
    it('should return is-following as false when not logged in', (done) => {
      request(app)
        .get('/api/users/102/is-following')
        .end((err, res) => {
          expect(res).to.have.status(200);
          let data = JSON.parse(res.text);
          expect(data).to.eql(false);
          done();
        });
    });

    it('should be initialized with test_user1 (logged in) following test_user2', (done) => {
      authenticatedUser
        .get('/api/users/102/is-following')
        .end((err, res) => {
          expect(res).to.have.status(200);
          let data = JSON.parse(res.text);
          expect(data).to.eql(true);
          done();
        });
    });

    it('should make test_user1 unfollow test_user 2, then refollow', (done) => {
      authenticatedUser
        .post('/api/users/102/follow')
        .send({follow: false})
        .end((err, res) => {
          expect(res).to.have.status(200);
          let data = JSON.parse(res.text);
          expect(data).to.eql(false);
          done();
        });
    });

    it('should return test_user1 is not following test_user2 after unfollowing', (done) => {
      authenticatedUser
        .get('/api/users/102/is-following')
        .end((err, res) => {
          expect(res).to.have.status(200);
          let data = JSON.parse(res.text);
          expect(data).to.eql(false);
          done();
        });
    });


    it('should make test_user1 follow test_user2', (done) => {
      authenticatedUser
        .post('/api/users/102/follow')
        .send({follow: true})
        .end((err, res) => {
          expect(res).to.have.status(200);
          let data = JSON.parse(res.text);
          expect(data).to.eql(true);
          done();
        });
    });
  });
});