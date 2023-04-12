require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser') 
const connectDB = require('./db/connection')
const cors = require("cors")

const userRoute = require('./routes/user_rt')
const convoRoute = require('./routes/convo_rt')
const gigRoute = require('./routes/gig_rt')
const messageRoute = require('./routes/message_rt')
const orderRoute = require('./routes/order_rt')
const reviewRoute = require('./routes/review_rt')
const authRoute = require('./routes/auth_rt')
const catRoute = require('./routes/cat_rt')

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/api/gig', gigRoute)
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/convo', convoRoute)
app.use('/api/message', messageRoute)
app.use('/api/orders', orderRoute)
app.use('/api/review', reviewRoute)
app.use('/api/cat', catRoute)


const dbConnection = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
  } catch (error) {
    console.log(error);
  }
} 

app.listen(3000, () => {
  dbConnection()
  console.log('Server is up & running');
})

