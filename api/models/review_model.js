const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({

  gigId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    enum: [1,2,3,4,5] // can only be 1 to 5
  },
  desc: {
    type: String,
    required: true,
  }
  
},{
  timestamps: true
})

const Review = mongoose.model('Review', ReviewSchema)
module.exports = Review