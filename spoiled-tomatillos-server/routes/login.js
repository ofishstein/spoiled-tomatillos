const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  session.User
    .findOne({where: {id: userId}})
    .then((user) => {
      if (!user) return done(null, false);
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
  session.User
    .findOne({where: {username: username}})
    .then((user) =>{
      if (!user) return done(null, false);
      user.validatePassword(password, user.get('password')).then((valid) => {
        if (!valid) return done(null, false);
        return done(null, user);
      });
    })
    .catch((err) => {
      return done(err);
    });
}));

/* Post to login user. */
router.post('/', passport.authenticate('local', {}), function(req, res) {
  res.sendStatus(200);
});

module.exports = router;