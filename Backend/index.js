const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
// const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/connectDB');

// Load environment variables first
// dotenv.config();
require('dotenv').config();


// Connect to MongoDB
connectDB();

// Middleware setup
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
   allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(morgan('combined'));
app.use(helmet({ crossOriginResourcePolicy: false }));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

//booking process
const authRoutes = require('./routes/auth.route')
app.use('/api/auth',authRoutes);

app.use('/api/test',authRoutes); // if saved in routes/testRoute.js


const userRoutes = require('./routes/user.route')
app.use('/api/user',userRoutes);


const productRoutes = require('./routes/product.route')
app.use('/api/product',productRoutes);


const bookingRouter = require('./routes/booking.route');
app.use('/api/booking',bookingRouter);

// const washerSearchRouter = require('./routes/range.route');
// app.use('/api/washerman',washerSearchRouter);

//washerman route
const washermanRouter = require('./routes/washerman.route');
app.use('/api/washerman', washermanRouter);


const availability = require('./routes/available.route'); // this includes slot and booking endpoints
const slotTemplateRoutes = require('./routes/predefine.route'); // admin slot template

app.use('/api/show', availability);
app.use('/api', slotTemplateRoutes); // for /slot-templates



// timeslots
// const availability = require('./routes/available.route.js');
// app.use('/api',availability);

// const predefine = require('./routes/predefine.route.js');
// app.use('/api/predefine', predefine);
// const availability = require('./routes/available.route.js');
// app.use('/api',availability);

// in index.js or server.js
// app.use("/api", require("./routes/availability.routes"));



//dashboard 
const dashRouter = require('./routes/dashboard.route');
app.use('/api',dashRouter);


//updated  user
const updateUserRouter = require('./routes/user.route');
app.use('/api/user',updateUserRouter);


// delete user
const deleteUserRouter = require('./routes/user.route');
app.use('/api/user',deleteUserRouter);



const serviceRoutes = require('./routes/service.route');
app.use('/api/services', serviceRoutes);

// //predefine route
// const availabilityRoutes = require("./routes/predefine.route");

// app.use("/api/washerman/availability", availabilityRoutes);


app.use('/api/washerman', washermanRouter);


// const PreTimeSlot= require('./routes/predefine.route.js');
// app.use('/api/admin', PreTimeSlot);

// const washermanScheduleRouter = require('./routes/available.route.js');
// app.use('/api/time', washermanScheduleRouter);

// Basic route
app.get('/', (req, res) => {
    res.send("home page");
});

// Server start
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
