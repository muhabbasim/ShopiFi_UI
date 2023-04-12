const express = require('express');
const router = express.Router();

const { 
  addReview,
  removeReview,
  getReviews,
} = require('../controller/review_ctrl')


router.post('/add', addReview )
router.delete('/:reviewId', removeReview)
router.get('/:gigId', getReviews)

module.exports = router;