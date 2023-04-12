const express = require('express');
const router = express.Router();
const { 
  getCats,
  createCat,
} = require('../controller/cat_ctrl')

router.post('/', createCat)
router.get('/', getCats)

module.exports = router;
