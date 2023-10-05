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
  selectedRooms: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Room', 
      required: true,
    },
  ],   
  totalAmount: {
    type: Number,
    required: true
  }, 
  paymentId: {
    type: String,
    required:true
  },
  paymentStatus: {
    type: String,
    required:true
  },
  // bookingStatus: {
  //   type: String,
  //   default:'booked'
  // }
  bookingStatus: {
    type: String,
    // enum: ['Booked','Cancelled','Checked-in','Not Checked-in'],
    default:'booked'
  }
},
  { timestamps: true }
);
module.exports = mongoose.model('Booking', bookingSchema);