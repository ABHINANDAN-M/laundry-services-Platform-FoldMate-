






// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   guest: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   washerman: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true
//   },

//   slotTime: { type: String }, // e.g., "07:00-10:00"
//   pickupTimeSlot: {
//   type: String,
//   required: true
// },

//   // pickupDate: { type: String }, // e.g., "2025-06-05"
 
//   // pickupDate: {
//   //   type: String, // or Date if you're using JS Date objects
//   //   required: true
//   // },
//   // pickupTimeSlot: {
//   //   type: String,
//   //   required: true
//   // },
//   quantity: {
//     type: Number,
//     default: 1,
//     min: 1
//   },
//   totalAmount: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   status: {
//     type: String,
//     enum: ['booked', 'picked_up', 'in_progress', 'delivered', 'cancelled'],
//     default: 'booked'
//   },
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'paid'],
//     default: 'pending'
//   },
//   paymentMethod: {
//   type: String,
//   enum: ['UPI', 'Cash', 'Card'],
//   default: 'Cash'
// },
// upiProvider: {
//   type: String,
//   default: '' // optional
// },

  
// }, {
//   timestamps: true
// });

// bookingSchema.index({ guest: 1 });
// bookingSchema.index({ washerman: 1 });
// bookingSchema.index({ status: 1 });

// module.exports = mongoose.model('Booking', bookingSchema);









const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  washerman: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  date: { type: String, required: true },
  slot: {
    label: { type: String },
    range: { type: String }
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['booked', 'picked_up', 'in_progress', 'delivered', 'cancelled'],
    default: 'booked'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
paymentMethod: {
  type: String,
  enum: ['cash'], // only allow 'cash' as a valid value
  required: true
}

}, {
  timestamps: true
});

// Indexes for performance
bookingSchema.index({ guest: 1 });
bookingSchema.index({ washerman: 1 });
// bookingSchema.index({ pickupDate: 1 });
// bookingSchema.index({ pickupTimeSlot: 1 });
bookingSchema.index({ status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
