const  Review = require("../models/review_model") 

const addReview = async (req, res) => {

  try {
    
    const newReview = new Review({
      userId: req.body.userId,
      ...req.body,
    })
    await newReview.save()
    res.status(200).json({message: "Review successfully added"})
  } catch (error) {
    console.log(error)
  }
}

const removeReview = async (req, res) => {
  
  try {
    // const review = await Review.findById(req.params.reviewId)
    // const userId = req.body.userId
    // if(userId !== review.userId) {
    //   return res.status(500).json({message: "You can only delete your review"})
    // }

    await Review.findByIdAndDelete(req.params.reviewId)
    res.status(200).json({message: "Review deleted successfully"})
  } catch (error) {
    console.log(error)
  }
}

const getReviews = async (req, res) => {
  const gigId = req.params.gigId

  try {
    const reviews = await Review.find({gigId}).sort({ "createdAt": -1 })
    res.status(200).json(reviews)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  addReview,
  removeReview,
  getReviews,
}