const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // regex for email
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email"
    ]
  },

  password: {
    type: String,
    required: true,
    unique: false,
  },

  img: {
    type: String,
    required: false,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  },

  country: {
    type: String,
    required: false,
  },

  phone: {
    type: String,
    required: false,
  },

  desc: {
    type: String,
    required: false,
  },
  
  isSeller: {
    type: Boolean,
    default: false,
  },

},{
  timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User