const asyncHandler = require('express-async-handler');
const Gig = require('../models/gig_model')

// add Gigs
const addGig = asyncHandler ( async (req, res)=> {
  
  // if (!req.isSeller) {
  //   return res.status(401).json({message: "Only sellers can add Gig", data: newGig})
  // }

  const newGig = new Gig({
    // userId: req.userId,
    ...req.body
  })
  await newGig.save()

  if (newGig) {
    return res.status(201).json({message: "Gig added successfully", data: newGig})
  } else {
    res.status(500).send('something went wrong')
  }
})

//delete Gig
const deleteGig = asyncHandler ( async (req, res)=> {

  try {
    const gig = await Gig.findById(req.params.id);

    // if(gid.userId !== req.userId) {
    //   return res.status(403).json({message: "You can only delete your gid"})
    // }
    
    await Gig.findByIdAndDelete(req.params.id);
    res.status(201).json({message: "Gig deleted successfully"})

  } catch (error) {
    return res.status(500).json(error)
  }
})

// get single Gig
const getGig = asyncHandler ( async (req, res)=> {
  
  const gig = await Gig.findById(req.params.id)
  if(!gig) return res.status(404).json({message: "Gig not found"})

  if(gig) {
    return res.status(201).json({gig})
  } else {
    res.status(500).send('something went wrong')
  }
  
})

// get user Gigs
const userGigs = asyncHandler ( async (req, res)=> {
  const userId = req.params.userId
  
  const gig = await Gig.find({userId})
  if(!gig) return res.status(404).json({message: "Gig not found"})

  if(gig) {
    return res.status(201).json({gig})
  } else {
    res.status(500).send('something went wrong')
  }
  
})

// get Gigs
const getGigs = asyncHandler ( async (req, res)=> {
  const q = req.query

  try {
    const filters = {
      ...( q.cat && { cat: q.cat }), // conditional states: if there is a q.cat then add { cat: q.cat }
      ...( q.userId && { userId: q.userId }), 
      ...(( q.min || q.max ) && { 
        price: {
          ...( q.min && {$gt: q.min}),
          ...( q.max && {$lt: q.max})
        }
      }),
      ...( q.search && { title: {$regex: q.search, $options: "i"}})  // options "i" for case insensitive search
    }

    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 }); // -1 mean the last one created
    res.status(201).json(gigs)
  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = {
  addGig,
  deleteGig,
  getGig,
  getGigs,
  userGigs
}