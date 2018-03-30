const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const db = require('../db/db');
const session = db.get_session();
const testData = require('./testData');
const should = chai.should();

chai.use(chaiHttp);
describe('Movies', () => {
  before((done) => {
    session.Movie.bulkCreate(testData.movies).then(() => {done();});
  });

  after((done) => {
    const movieIds = testData.movies.map((movie) => movie.id);
    session.Movie.destroy({where: {id: movieIds}}).then(() => {
      done();
    });
  });

  describe('GET movie information', () => {
    it('It should return a movie information object', (done) => {
      chai.request(app).get('/api/movies/' + testData.movies[0].id).end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('id');
        res.body.id.should.equal(testData.movies[0].id);
        res.body.should.have.property('imdbId');
        res.body.imdbId.should.equal(testData.movies[0].imdbId);
        done();
      });
    });
  });
});