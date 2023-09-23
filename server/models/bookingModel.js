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
      title: {
        type: String,
      },
      count: {
        type:Number
      }
    }
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
  bookingStatus: {
    type: String,
    default:'booked'
  }
},
  { timestamps: true }
);
module.exports = mongoose.model('Booking', bookingSchema);