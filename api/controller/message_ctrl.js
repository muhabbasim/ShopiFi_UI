const Message = require('../models/message_model');
const Conversation = require('../models/convo_model');

// create message
const createMessage = async (req, res) => {

    const newMessage = new Message({ 
        conversationId: req.body.conversationId,
        userId: req.userId, 
        desc: req.body.desc
    })

    try {

        const savedMessage = await newMessage.save()

        await Conversation.findOneAndUpdate(
            {id: req.body.conversationId},
            {
              $set: {
                readBySeller: req.isSeller,
                readByBuyer: !req.isSeller,
                lastMessage: req.body.desc,
              },
            },
            { new: true }
          )
        res.status(200).json(savedMessage)
    } catch (error) {
        console.log(error)
    }

}

// get message
const getMessages = async (req, res) => {
    
    try {
        const messages = await Message.find({ conversationId: req.params.id })
        res.status(200).json(messages)
    } catch (error) {
        console.log(error)
    }

}

const getUnMessages = async (req, res) => {
    
    try {
        const messages = await Message.find({ conversationId: req.params.id })
        res.status(200).json(messages)
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    createMessage,
    getMessages,

}