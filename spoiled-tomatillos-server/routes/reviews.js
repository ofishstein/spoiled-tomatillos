const express = require('express');
const router = express.Router();

const db = require('../db/db.js');
const session = db.get_session();

// GET METHODS

router.get('/flagged', authCheck, function(req, res) {
 // TODO: get all flagged reviews (admin only)
});

router.get('/:review_id', function(req, res) {
  // TODO: get a review by an id
});

// POST METHODS
router.post('/:review_id/flag', authCheck, function(req, res) {
  // TODO: Flag a review (anyone)
});

router.post('/:review_id/unflag', authCheck, function(req, res) {
  // TODO: Unflag a review (anyone)
})

// PUT METHODS
router.put('/:review_id', authCheck, function(req, res) {
 // TODO: Update a review (admin or review creator only)
});

// DELETE METHODS

router.delete('/:review_id', authCheck, function(req, res) {
 // TODO: delete a given review
});


module.exports = router;
