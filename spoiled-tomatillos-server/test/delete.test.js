const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
const request = require('supertest');
let authenticatedUser = request.agent(app);

const db = require('../db/db');
const session = db.get_session();

const testData = require('./testData');

describe('DELETE User', () => {
    before((done) => {
        // setup db
        session.User.bulkCreate(testData.users).then(() => {
            // login
            authenticatedUser
                .post('/api/login')
                .send({username: 'test_user1', password: 'test'})
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    after((done) => {
        // teardown db
        session.User.destroy({where: {}}).then(() => {
            done();
        });
    });

    it('should return 401 when logged in as test_user1 and try to delete test_user2', (done) => {
        authenticatedUser
            .delete('/api/users/102')
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it('should delete test_user1 when logged in as test_user1', (done) => {
        authenticatedUser
            .delete('/api/users/101')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should return 0 users when searching for test_user1 after deleted', (done) => {
        request(app).get('/api/users?username=test_user1')
            .end((err, res) => {
                let data = JSON.parse(res.text);
                expect(data.length).to.eql(0);
                done();
            });
    });

    it('should delete test_user2 when logged in as test_admin', (done) => {
        authenticatedUser
            .post('/api/logout')
            .end((err, res) => {
            expect(res).to.have.status(200);
            authenticatedUser.post('/api/login')
                .send({username: 'test_admin', password: 'test'})
                .end((err, res) => {
                expect(res).to.have.status(200);
                authenticatedUser
                    .delete('/api/users/102')
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            done();
                        });
                });
            });
    });

    it('should return 0 users when searching for test_user2 after deleted by admin', (done) => {
        request(app).get('/api/users?username=test_user2')
            .end((err, res) => {
                let data = JSON.parse(res.text);
                expect(data.length).to.eql(0);
                done();
            });
    });
});