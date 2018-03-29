const express = require('express');
const router = express.Router();

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
        session.Watchlist
            .build({name: 'My Watchlist', userId: newUser.id})
            .save()
            .then(() => {
                res.json(newUser);
            });
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});

router.post('/logout', function(req, res) {
    req.logout();
    res.sendStatus(200);
});

router.get('/get-current-user', function(req, res) {
    if (req.isAuthenticated()) {
        let response = req.user;
        response.loggedIn = true;
        res.json(response);
    } else {
        res.json({loggedIn: false});
    }
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
  res.sendStatus(200);
});

module.exports = router;
