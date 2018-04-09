const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
const request = require('supertest');

const db = require('../db/db');
const session = db.get_session();

const testData = require('./testData');
let login = {username: 'test_user1', password: 'test'};
let authenticatedUser = request.agent(app);

describe('User Settings', () => {
  before((done) => {
    // setup db
    session.User.bulkCreate(testData.users).then(() => {
      done();
    });
  });

  after(function (done) {
    // teardown db
    session.User.destroy({where: {}}).then(() => {
      done();
    });
  });

  describe('Get and update user settings', () => {
    before(function (done) {
      // login
      authenticatedUser
        .post('/api/login')
        .send(login)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });

    after((done) => {
      authenticatedUser
        .post('/api/logout')
        .send(null)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should return 401 when not logged in', (done) => {
      request(app)
        .get('/api/users/settings')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should return test_user1\'s settings when test_user1 logged in', (done) => {
      authenticatedUser
        .get('/api/users/settings')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('username');
          expect(res.body).to.have.property('email');
          expect(res.body).to.have.property('bio');

          done();
        });
    });

    it('should update all user fields if logged in as user', (done) => {
      let updated = {
        username: 'updated', email: 'updated@test.com',
        password: 'updated', firstName: 'updated',
        lastName: 'updated', bio: 'This is an updated bio'
      };
      authenticatedUser
        .put('/api/users/settings')
        .send(updated)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Login and get settings after settings were updated', () => {
    // before((done) => {
    //     // login with updated credentials
    //     authenticatedUser
    //         .post('/api/login')
    //         .send({username: 'updated', password: 'updated'})
    //         .end(function (err, res) {
    //             expect(res).to.have.status(200);
    //             done();
    //         });
    // });

    it('should return 401 when logging in with old credentials', (done) => {
      request(app).post('/api/login')
        .send(login)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    // it('should return updated settings when logged in with updated credentials', (done) => {
    //     let updatedUser = testData.users[0];
    //     updatedUser.username = 'updated';
    //     updatedUser.email = 'updated@test.com';
    //     updatedUser.firstName = 'updated';
    //     updatedUser.lastName = 'updated';
    //     updatedUser.bio = 'This is an updated bio';
    //     delete updatedUser.password;
    //     delete updatedUser.createdAt;
    //     delete updatedUser.updatedAt;
    //
    //     request.agent(app)
    //         .get('/api/users/settings')
    //         .end((err, res) => {
    //             expect(res).to.have.status(200);
    //             expect(res.body).to.eql(updatedUser);
    //             done();
    //         });
    // });
  });
});