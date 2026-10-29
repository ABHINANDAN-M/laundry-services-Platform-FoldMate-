// // models/timeSlot.model.js
// const mongoose = require("mongoose");

// const preSlotSchema = new mongoose.Schema({
//   time: {
//     type: String, // e.g., "07:00-10:00"
//     required: true,
//     unique: true
//   }
// });

// module.exports = mongoose.model("PreTimeSlot", preSlotSchema);



// const mongoose = require('mongoose');

// const timeSlotSchema = new mongoose.Schema({
//   startTime: String,         // "06:00"
//   endTime: String,           // "09:00"
//   label: String,             // "Morning Slot 1"
// });

// module.exports = mongoose.model("SystemTimeSlot", timeSlotSchema);



// const mongoose = require("mongoose");

// const slotTemplateSchema = new mongoose.Schema({
//   time: String,    // "10:00 - 11:00"
//   period: String   // "Morning"
// });

// module.exports = mongoose.model("SlotTemplate", slotTemplateSchema);



const mongoose = require("mongoose");

const slotTemplateSchema = new mongoose.Schema({
  date: { type: String, required: true }, // "2025-07-01"
  slots: [{
    label: String,              // e.g., "Morning"
    range: String               // e.g., "07:00-09:00"
  }],
});

module.exports = mongoose.model("SlotTemplate", slotTemplateSchema);
