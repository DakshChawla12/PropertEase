const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 9090;
const URL = process.env.MONGO_URL || "mongodb+srv://dakshchawla2004:doctordaksh@cluster0.19je8.mongodb.net/PropertEase";

// *** importing routes *** //
const buyRoute = require('./Routes/buy_route');
const sellRoute = require('./Routes/sell_route');
const authRouter = require('./Routes/authRoute');
const userRouter = require('./Routes/userRoute');

// *** importing connectDB function *** //
const connectDB = require('./dbConnect');

// *** connecting to mongoDb *** //
connectDB(URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const app = express();

app.use(cors());
app.use(express.json())

app.use('/buy',buyRoute);
app.use('/sell',sellRoute);
app.use('/auth',authRouter);
app.use('/user',userRouter);


app.listen(PORT, (err) => {
    if (err) {
        console.log("error connecting to server");
    } else {
        console.log(`connected to server at port ${PORT}`);
    }
})