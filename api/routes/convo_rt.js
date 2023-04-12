const express = require('express');
const router = express.Router();

const { 
  getConversations,
  createConversation,
  getSingleConversation,
  updateConversation,
  getUnOpenedConversations,
} = require('../controller/convo_ctrl')

const verifiedToken = require('../middleware/jwt')



router.post('/', verifiedToken, createConversation)
router.put('/:id', verifiedToken, updateConversation)
router.get('/single/:id', verifiedToken, getSingleConversation)
router.get('/', verifiedToken, getConversations)
router.get('/unread', verifiedToken, getUnOpenedConversations)

module.exports = router;