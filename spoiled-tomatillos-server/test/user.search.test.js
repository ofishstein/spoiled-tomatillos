const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
let requester;

const db = require('../db/db');
const session = db.get_session();

const testData = require('./testData');

describe('User Endpoints', () => {
    before((done) => {
        // setup db
        session.User.bulkCreate(testData.users).then(() => {
            // keep server open for requests
            requester = chai.request(app).keepOpen();
            done();
        });
    });

    after((done) => {
        // teardown db
        session.User.destroy({where: {}}).then(() => {
            // manually close server down
            requester.close();
            done();
        });
    });

    describe('Search for users', () => {
        it('should return all 3 users when search for "test"', (done) => {
            requester.get('/api/users?username=test')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    let data = JSON.parse(res.text);
                    expect(data.length).to.eql(3);
                    done();
                });
        });
        it('should return 0 users when search for "asdf"', (done) => {
            requester.get('/api/users?username=asdf')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    let data = JSON.parse(res.text);
                    expect(data.length).to.eql(0);
                    done();
                });
        });
    });
});