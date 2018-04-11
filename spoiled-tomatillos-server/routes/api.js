const express = require('express');
const router = express.Router();
const logger = require('../logger');

const db = require('../db/db.js');
const session = db.get_session();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.post('/register', function(req, res) {
  // make sure not creating admin user
  req.body.isAdmin = false;

  session.User
    .build(req.body)
    .save()
    .then((newUser) => {
      logger.info('New non-admin user created', logger.omit(newUser.get({plain: true}), 'password'));
      res.json(newUser);
    })
    .catch(error => {
      logger.error('Registration Error', error);
      if (error.constructor.name === 'UniqueConstraintError') {
        res.sendStatus(400).send(error);
        return;
      }

      res.sendStatus(500);
    });
});

router.post('/logout', function(req, res) {
  logger.info('User logged out', logger.omit(req.user.get({plain: true}), 'password'));
  req.logout();
  res.sendStatus(200);
});

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

passport.use(new LocalStrategy({passReqToCallback: true}, function(req, username, password, done) {
  session.User
    .findOne({where: {username: username}})
    .then((user) =>{
      if (!user) return done(null, false);
      user.validatePassword(password, user.get('password')).then((valid) => {
        if (!valid) return done(null, false);
        // check if admin login
        if ((req.body.admin && user.isAdmin) || !req.body.admin) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
    .catch((err) => {
      return done(err);
    });
}));

/* Post to login user. */
router.post('/login', passport.authenticate('local', {}), function(req, res) {
  logger.info('User logged in', logger.omit(req.user.get({plain: true}), 'password'));
  let resp = req.user.get({plain: true});
  delete resp.password;
  res.send(resp);
});

module.exports = router;
