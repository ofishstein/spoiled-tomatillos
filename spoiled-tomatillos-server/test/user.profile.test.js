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

describe('Profile Related Endpoints', () => {
    before((done) => {
        // setup db
        session.User.bulkCreate(testData.users).then(() => {
            session.Movie.bulkCreate(testData.movies).then(() => {
                session.Follower.bulkCreate(testData.followers).then(() => {
                    session.Review.bulkCreate(testData.reviews).then(() => {
                        session.WatchlistItem.bulkCreate(testData.watchlist).then(() => {
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
                    let data = JSON.parse(res.text);

                    expect(data).to.have.property('followers');
                    expect(data).to.have.property('following');
                    expect(data).to.have.property('reviews');
                    expect(data).to.have.property('activities');
                    expect(data).to.have.property('username');
                    expect(data).to.have.property('profileImageUrl');
                    expect(data).to.have.property('watchlist');

                    done();
                });
        });
    });


    describe('GET a user\'s watchlist', () => {
        it('/api/users/1/watchlist', (done) => {
            requester.get('/api/users/101/watchlist')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    let data = JSON.parse(res.text);
                    expect(data.length).to.eql(3);
                    done();
            });
        });
    });

    describe('GET a user\'s reviews', () => {
        it('should return all of the user\'s reviews', (done) => {
            requester.get('/api/users/101/reviews')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    let data = JSON.parse(res.text);
                    expect(data.length).to.eql(2);

                    expect(data[0]).to.have.property('text');
                    expect(data[0]).to.have.property('rating');
                    expect(data[0]).to.have.property('Movie');
                    expect(data[0]['Movie']).to.have.property('poster');
                    // expect(data[0]['Movie']['poster'] !== null).to.eql(true);

                    done();
                });
        });
    });


});