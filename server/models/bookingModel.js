const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Hotel'
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  noOfGuests: {
    type: Number,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerMobile: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required:true
  }
});
module.exports = mongoose.model('Booking', bookingSchema);