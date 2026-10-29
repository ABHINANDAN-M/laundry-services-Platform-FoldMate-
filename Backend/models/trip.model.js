const tripSchema = new mongoose.Schema({
  washermanId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tripType: { type: String, enum: ['pickup', 'delivery'], required: true },
  timeSlotId: { type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot' },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  area: { type: String },
  status: { type: String, enum: ['scheduled', 'in_progress', 'completed'], default: 'scheduled' }
});

module.exports = mongoose.model('Trip', tripSchema);
