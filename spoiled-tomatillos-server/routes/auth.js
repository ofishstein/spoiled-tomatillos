authCheck = (req, res, done) => {
  if (req.isAuthenticated()) {
    return done();
  }
  res.status(401).send('User not logged in');
};

module.exports = authCheck;