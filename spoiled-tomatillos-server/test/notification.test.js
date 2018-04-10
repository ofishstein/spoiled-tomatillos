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

  after((done) => {
    // teardown db
    session.Notification.destroy({where: {}}).then(() => {
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
  });

  it('should initalize with test_user1 having 0 notifications', (done) => {
    authenticatedUser.get('/api/notifications')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('notifications');
        expect(res.body['notifications'].length).to.eql(0);
        done();
      });
  });

  it('should create a follower notification when test_user2 follows test_user1', (done) => {
    session.Follower
      .build({
        followerId: 102,
        followeeId: 101
      })
      .save()
      .then((followship) => {
        authenticatedUser.get('/api/notifications')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body['unseenCount']).to.eql(1);
            expect(res.body['notifications'].length).to.eql(1);
            let n = res.body['notifications'][0];
            expect(n['type']).to.eql('FOLLOWER');
            expect(n['seen']).to.eql(null);
            expect(n).to.have.property('Follower');
            // TODO: add more follower specific comparisons once format finalized
            expect(n['Recommendation']).to.eql(null);
            done();
          });
      });
  });

  // it('should create a recommendation notification when test_user2 recommends a movie to test_user1', (done) => {
  //   session.Recommendation
  //     .build({
  //       message: 'Must watch!',
  //       recommenderId: 102,
  //       recomendeeId: 101,
  //       movieId: 101
  //     })
  //     .save()
  //     .then((rec) => {
  //       authenticatedUser.get('/api/notifications')
  //         .end((err, res) => {
  //           expect(res).to.have.status(200);
  //           expect(res.body['unseenCount']).to.eql(1);
  //           expect(res.body['notifications'].length).to.eql(2);
  //           let n = res.body['notifications'][0];
  //           expect(n['type']).to.eql('RECOMMENDATION');
  //           done();
  //         });
  //     });
  // });

  it('should delete the follower notification when test_user2 unfollows test_user1', (done) => {
    session.Follower.destroy({
      where:
        {followerId: 102, followeeId: 101}
    })
      .then(() => {
        authenticatedUser.get('/api/notifications')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body['notifications'].length).to.eql(0);
            // expect(res.body['notifications'][0]['type']).to.eql('RECOMMENDATION');
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