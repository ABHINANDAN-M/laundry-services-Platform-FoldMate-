


// const express = require('express');
// const { isAuth} = require('../middleware/isAuth');
// const {  createBooking,
//   getMyBookings,getAllBookings,getAssignedBookings, updateBookingStatus,
//   } = require('../controllers/booking.controller'); //Import the controller

// const bookingRouter = express.Router();

// bookingRouter.post("/create/:id", isAuth, createBooking); // Add ":id" to the route if booking is for a specific product
// bookingRouter.get('/', isAuth, getMyBookings);
// bookingRouter.get('/all', isAuth, getAllBookings);
// bookingRouter.get("/assigned",isAuth, getAssignedBookings); 
// bookingRouter.put('/:id/status', isAuth, updateBookingStatus);
// // routes/availability.routes.js
// // router.get("/availability", getAvailableSlotsForCustomer);
// const { updatePaymentInfo } = require('../controllers/booking.controller');

// // Add this line:
// bookingRouter.put('/:id/payment', isAuth, updatePaymentInfo);


// module.exports = bookingRouter;


const express = require('express');
const { isAuth } = require('../middleware/isAuth');
const {
  createMultipleBookings,
  // createBooking,
  getMyBookings,
  getAllBookings,
  getAssignedBookings,
  updateBookingStatus,
  updatePaymentInfo,
  getOrderSummary
} = require('../controllers/booking.controller');

const bookingRouter = express.Router();

// // 📦 Create a booking (customer only) — requires product ID
// bookingRouter.post('/create/:id', isAuth, createBooking);
// 📦   Create multiple bookings (customer only) — requires product IDs
bookingRouter.post('/create-multi', isAuth, createMultipleBookings);

// 👤 Get bookings for logged-in user (customer/washerman)
bookingRouter.get('/', isAuth, getMyBookings);

// 🧺 Washerman: Get assigned bookings
bookingRouter.get('/assigned', isAuth, getAssignedBookings);

// 🛡️ Admin: Get all bookings
bookingRouter.get('/all', isAuth, getAllBookings);

// 🔄 Update booking status (cancel, pick-up, delivered)
bookingRouter.put('/:id/status', isAuth, updateBookingStatus);

// 💳 Update payment status/method
bookingRouter.put('/:id/payment', isAuth, updatePaymentInfo);

bookingRouter.get('/summary', isAuth, getOrderSummary); 

module.exports = bookingRouter;
