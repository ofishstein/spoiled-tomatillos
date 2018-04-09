const chai = require('chai');
const app = require('../app');

const should = chai.should();
const request = require('supertest');

const db = require('../db/db');
const session = db.get_session();

describe('Register Endpoint', () => {
  after((done) => {
    // delete created user
    session.User.destroy({where: {}}).then(() => {
      done();
    });
  });

  it('should create a new non-admin user', (done) => {
    request(app)
      .post('/api/register')
      .send({firstName: 'new',
        lastName: 'new',
        username: 'new_user',
        email: 'new@test.com',
        password: 'new'
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should login successfully with new user\'s credentials', (done) => {
    request(app)
      .post('/api/login')
      .send({username: 'new_user', password: 'new', isAdmin: false})
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});