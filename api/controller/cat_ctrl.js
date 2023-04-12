const Cat = require("../models/cat_model")


// get user account
const getCats = async (req, res) => {

  try {
    const cat =  await Cat.find()
    res.status(200).json(cat);
  } catch (error) {
    console.log(error)
  }
  
}

const createCat = async (req, res) => {

  try {
    const cat =  new Cat({
      name: req.body.name,
      desc: req.body.desc,
      img: req.body.img,
      path: req.body.path
    })
    
    await cat.save()
    res.status(200).json(cat);
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = {
  getCats,
  createCat
}