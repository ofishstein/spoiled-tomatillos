const chai = require('chai');
const app = require('../app');

const expect = chai.expect;
const request = require('supertest');

const db = require('../db/db');
const session = db.get_session();

const testData = require('./testData');
let login = {username: 'test_user1', password: 'test'};
let authenticatedUser = request.agent(app);

describe('Notifications Tests', () => {
  before((done) => {
    // setup db
    session.User.bulkCreate(testData.users).then(() => {
      session.Movie.bulkCreate(testData.movies).then(() => {
        // create a follower notification
        session.Follower
          .build({
            followerId: 102,
            followeeId: 101
          })
          .save()
          .then((followship) => {
            expect(followship).to.not.be.a('null');

            // create a recommendation notification
            session.Recommendation
              .build({
                message: 'Must watch!',
                recommenderId: 102,
                recommendeeId: 101,
                movieId: 101
              })
              .save()
              .then((rec) => {
                expect(rec).to.not.be.a('null');

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
    });
  });

  after((done) => {
    // teardown db
    session.Recommendation.destroy({where: {}}).then(() => {
      session.Follower.destroy({where: {}}).then(() => {
        session.User.destroy({where: {}}).then(() => {
          session.Movie.destroy({where: {}}).then(() => {
            done();
          });
        });
      });
    });
  });

  it('should show test_user1 has 2 unseen notifications', (done) => {
    authenticatedUser.get('/api/notifications/unseenCount')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.eql(2);
        done();
      });
  });

  it('should show test_user1 has a follower and a recommendation notification', (done) => {
    authenticatedUser.get('/api/notifications')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body['unseenCount']).to.eql(2);
        expect(res.body['notifications'].length).to.eql(2);

        let fol = res.body['notifications'][0];
        expect(fol['type']).to.eql('FOLLOWER');
        expect(fol['seen']).to.eql(null);
        expect(fol).to.have.property('Follower');

        let rec = res.body['notifications'][1];
        expect(rec['type']).to.eql('RECOMMENDATION');
        expect(rec).to.have.property('Recommendation');
        expect(rec['Recommendation']).to.have.property('Movie');
        expect(rec['Recommendation']).to.have.property('Recommender');

        done();
      });
  });

  it('should delete the follower notification if the followship is removed', (done) => {
    session.Follower.destroy({
      where:
        {followerId: 102, followeeId: 101}
    })
      .then(() => {
        authenticatedUser.get('/api/notifications')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body['unseenCount']).to.eql(0);
            expect(res.body['notifications'].length).to.eql(1);
            expect(res.body['notifications'][0]['type']).to.eql('RECOMMENDATION');
            done();
          });
      });
  });

  it('should return 401 if not logged in', (done) => {
    request(app).get('/api/notifications')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

});