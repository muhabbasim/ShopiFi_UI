const mongoose = require('mongoose');

const MessaagewSchema = mongoose.Schema({

  conversationId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },

},{
  timestamps: true
})

const Message = mongoose.model('Messaagew', MessaagewSchema);
module.exports = Message;