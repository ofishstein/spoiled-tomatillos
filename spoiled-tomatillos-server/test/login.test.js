const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);
describe('Login', () => {
  describe('POST Valid Login', () => {
    it('It should return a valid user', (done) => {
      let validUser = {
        username: 'SeedUser1',
        password: 'su1'
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
        username: 'SeedUser1',
        password: 'su2'
      };
      chai.request(app).post('/api/login').send(invalidUser).end((err, res) => {
        res.should.have.status(401);
        done();
      });
    });
  });
});