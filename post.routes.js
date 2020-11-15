const express = require('express');
const router = express.Router();
const db = require('./../db');

// get all posts
router.route('/posts').get((req, res) => {
  res.json(db.posts);
});

/* ... */

module.exports = router;