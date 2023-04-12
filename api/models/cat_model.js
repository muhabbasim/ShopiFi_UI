const mongoose = require('mongoose');

const catSchema = mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
  },
 
  img: {
    type: String,
    required: false,
  },

  desc: {
    type: String,
    required: false,
  },

  path: {
    type: String,
    required: false,
  },

},{
  timestamps: true
})

const Cat = mongoose.model('categoris', catSchema)
module.exports = Cat