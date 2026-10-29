const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['cash', 'online'], default: 'cash' },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);





// const mongoose = require('mongoose');


// const paymentSchema = new mongoose.Schema({
//     order_id : {
//         type : mongoose.Schema.ObjectId,
//         ref : 'ORDER',
//         required : true
//     },
//     amount : {
//         type : Number,
//         required : true,
//         min : [0,'Amount must be a positive number']
//     },
//     payment_method : {
//         type : String,
//         enum : ['CASH_ON_DELIVERY','CARD','UPI','NET_BANKING','WALLET'],
//         required : true
//     },
//     transaction_id : {
//         type : String,
//         default: null
//     },
//     payment_status : {
//         type : String,
//         enum : ['PENDING','SUCCESS','FAILED','REFUNDED'],
//         default : 'PENDING'
//     },
//     paid_at : {
//         type : Date,
//         default : null
//     },
//     notes : {
//         type : String,
//          default : ""
//     }


// }, {
//     timestamps : true
// });

// const PaymentModel = mongoose.model('Payment',paymentSchema);

// module.exports = PaymentModel;