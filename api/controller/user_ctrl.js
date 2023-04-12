const User = require("../models/user_model")
const asyncHandler = require('express-async-handler');


// get user account
const getUser = asyncHandler( async (req, res) => {

  const user =  await User.findById(req.params.id)
  const {  password, ...info } = user._doc
  res.status(200).json(info);
  
})

// delete user account
const deleteUser = asyncHandler( async (req, res) => {

  const user =  await User.findById(req.params.id)
  const id = (user._id).toString()

  if ( req.userId !== id ) {
    return res.status(403).json({message: "You can delete you account only!"});
  }
  await User.findByIdAndDelete(id)
  res.status(200).clearCookie('shopiFi_access_token').json({message: "deleted sussfully"});
  
})

module.exports = {
  deleteUser,
  getUser
}