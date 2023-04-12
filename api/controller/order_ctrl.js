const Order = require('../models/order_model')
const Gig = require('../models/gig_model')
const Stripe = require("stripe");


const intent = async (req, res) => {
  
  const gig = await Gig.findById(req.params.gigId)
  
  // create payment intent
  const stripe = new Stripe(process.env.STRIPE_KEY)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  
  // create order
  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    price: gig.price,
    sellerId: gig.userId,
    buyerId: req.userId,
    isCompleted: false,
    payment_intent: paymentIntent.id,
  })
  //save order
  newOrder.save()
  res.status(200).json({clientSecret: paymentIntent.client_secret})
  
}


const getOrder = async (req, res) => {

  try {

    const orders = await Order.find({
      ...( req.isSeller ? {sellerId: req.userId} : {buyerId: req.userId}),
      isCompleted: true
    })

    // const orders = await Order.find({
    //   buyerId: req.params.buyerId,
    //   isCompleted: true
    // })
    
    res.status(200).json(orders)
  } catch (error) {
    console.log(error)
  }
  
}


const confirm = async (req, res) => {

  try {
    const order = await Order.findOneAndUpdate({payment_intent: req.body.payment_intent},
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    console.log(err);
  }
  
}

module.exports = {
  getOrder,
  intent,
  confirm
}



// const createOrder = async (req, res) => {
  
//   const gig = await Gig.findById(req.params.gigId)

//   try {

//     const newOrder = new Order({
//       gigId: gig._id,
//       img: gig.cover,
//       title: gig.title,
//       price: gig.price,
//       sellerId: gig.userId,
//       buyerId: req.body.buyerId,
//       isCompleted: true,
//       payment_intent: "temporary_payment",
//     })
    
//     newOrder.save()
//     res.status(200).json({message: 'Order successfully placed.'})
//   } catch (error) {
//     console.log(error)
//   }
  
// }