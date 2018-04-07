const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const db = require('../db/db');
const session = db.get_session();
const testData = require('./testData');
const should = chai.should();

chai.use(chaiHttp);
describe('Login', () => {
  before((done) => {
    session.User.bulkCreate(testData.users).then(() => {done();});
  });

  after((done) => {
    const userIds = testData.users.map((user) => user.id);
    session.User.destroy({where: {id: userIds}}).then(() => {
      done();
    });
  });

  describe('POST Valid Login', () => {
    it('It should return a valid user', (done) => {
      let validUser = {
        username: 'test_user1',
        password: 'test'
      };
      chai.request(app).post('/api/login').send(validUser).end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
  describe('POST Invalid Login: Nonexistant User', () => {
    it('It should return a 401 Unauthorized Error', (done) => {
      let invalidUser = {
        username: 'FakeUser1',
        password: 'fu1'
      };
      chai.request(app).post('/api/login').send(invalidUser).end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });
  });
  describe('POST Invalid Login: Wrong Password', () => {
    it('It should return a 401 Unauthorized Error', (done) => {
      let invalidUser = {
        username: 'test_user1',
        password: 'fu1'
      };
      chai.request(app).post('/api/login').send(invalidUser).end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });
  });
});