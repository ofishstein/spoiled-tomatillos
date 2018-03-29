const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();

// GET METHODS

router.get('/:watchlist_id', authCheck, function(req, res) {
 // TODO: get watchlist by id
});

// POST METHODS
router.post('/', authCheck, function(req, res) {
  // TODO: Create a watchlist for the logged in user
});

// DELETE METHODS

router.delete('/:watchlist_id', authCheck, function(req, res) {
 // TODO: delete a given watchlist
});


module.exports = router;
