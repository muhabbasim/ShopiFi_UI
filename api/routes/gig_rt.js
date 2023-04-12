const express = require('express');
const router = express.Router();

const { 
  addGig,
  deleteGig,
  getGig,
  getGigs,
  userGigs,
} = require('../controller/gig_ctrl')


router.post('/addgig', addGig)
router.delete('/:id',  deleteGig)
router.get('/single/:id', getGig)
router.get('/gigs', getGigs)
router.get('/usergigs/:userId', userGigs)

module.exports = router;