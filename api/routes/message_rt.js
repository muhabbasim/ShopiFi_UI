const express = require('express');
const router = express.Router();

const { 
    createMessage,
    getMessages,
    
} = require('../controller/message_ctrl')
const verifiedToken = require('../middleware/jwt')


router.post('/', verifiedToken, createMessage)
router.get('/:id', verifiedToken, getMessages)

module.exports = router;