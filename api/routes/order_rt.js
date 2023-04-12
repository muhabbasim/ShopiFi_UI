const express = require('express');
const router = express.Router();
const verifiedToken = require('../middleware/jwt')
const { 
  confirm,
  getOrder,
  intent
} = require('../controller/order_ctrl')


router.post('/create-payment-intent/:gigId', verifiedToken, intent)
router.get('/', verifiedToken, getOrder)
router.put('/', verifiedToken, confirm)

module.exports = router;