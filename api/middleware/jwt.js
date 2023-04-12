const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler'); 
const verifiedToken = asyncHandler( async (req, res, next) => {

  try {

    const token = req.cookies.shopiFi_access_token
    if(!token) return res.status(401).json({message: "You are not authorized!"});

    const verifiedT = jwt.verify(token, process.env.JWT_KEY)

    req.userId = verifiedT.id;
    req.isSeller = verifiedT.isSeller;

    next();
  } catch (error) {
    res.status(401).json({message: "Not authorized user please register."});
    
  }
})

module.exports = verifiedToken



