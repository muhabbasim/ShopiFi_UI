const asyncHandler = require('express-async-handler');
const User = require('../models/user_model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// register user
const registerUser = asyncHandler( async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({message: "Please fill all fields"})
  }

  const userExist = await User.findOne({email})
  if(userExist) return res.status(403).send({message: 'User already exists'});

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt)

  const newUser = new User({
    ...req.body,
    password: hashedPassword,
  })
  await newUser.save()

  if (newUser) {
    const { password, ...others } = newUser._doc
    return res.status(201).json({message: "successfully registered"})
  } else {

    res.status(500).send('Invalid user information')
  }
})

// login user 
const loginUser = asyncHandler( async (req, res) => {
  
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({message: "Please fill all fields"})
  }

  const user = await User.findOne({ email })
  if (!user) return res.status(404).json({message:"Not registered email!"})
  
  const inCorrect = bcrypt.compareSync(password, user.password)
  if (!inCorrect) return res.status(404).json({message: "Wrong information"})

  const token = jwt.sign({id: user._id, isSeller: user.isSeller},
    process.env.JWT_KEY
  )

  res.cookie('shopiFi_access_token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1day
    sameSite: "none",
    secure: true,
  })

  if (user && password) {
    const { password, ...info } = user._doc
    return res.status(201).json(info)

  } else {
    res.status(500).send('something went wrong')
  }
})


const logoutUser = async (req, res) => {
  return res.clearCookie('shopiFi_access_token', {
    sameSite: "none",
    secure: true
  })
  .status(200).json({ message:'logged out successfully'})
}


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
}