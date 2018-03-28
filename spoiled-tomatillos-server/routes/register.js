const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();

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

module.exports = router;