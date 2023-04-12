const Conversation = require('../models/convo_model');

// create conversations
const createConversation = async (req, res) => {

  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  })

  try {
    const savedNewConversation = await newConversation.save()
    res.status(200).json(savedNewConversation)
  } catch (error) {
    console.log(error)
  }

}

// update conversation
const updateConversation = async (req, res) => {
  
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      {id: req.params.id},
      {
        $set: {
          readBySeller: true,
          readByBuyer: true,
        },
      },
      { new: true }
    )

    res.status(200).json(updatedConversation)
  } catch (error) {
    console.log(error)
  }
}

// get single conversation
const getSingleConversation = async (req, res) => {
  
  try {
    const conversation = await Conversation.findOne({ id: req.params.id })

    if(!conversation) {
      return res.status(404).json({ message: "conversation not found"})
    }
    res.status(200).json(conversation)
  } catch (error) {
    console.log(error)
  }
}

// get conversations
const getConversations = async (req, res) => {
  
  try {
    const conversatios = await Conversation.find(
      req.isSeller ? {sellerId: req.userId} : {buyerId: req.userId}
    ).sort({updatedAt: -1})
    
    res.status(200).json(conversatios)
  } catch (error) {
    console.log(error)
  }
}

// get UnOpenedconversations
const getUnOpenedConversations = async (req, res) => {
  
  try {
    const conversatios = await Conversation.find(
      req.isSeller ? {sellerId: req.userId} : {buyerId: req.userId}
    ).sort({updatedAt: -1})
    
    res.status(200).json(conversatios.filter(unreadConvo => unreadConvo.readBySeller === false))

  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getConversations,
  createConversation,
  getSingleConversation,
  updateConversation,
  getUnOpenedConversations
}
