const express = require('express');
const router = express.Router();
const verifiedToken  = require('../middleware/jwt');
const { 
  deleteUser,
  getUser,
} = require('../controller/user_ctrl')

router.delete('/:id', verifiedToken, deleteUser)
router.get('/:id', getUser)

module.exports = router;
