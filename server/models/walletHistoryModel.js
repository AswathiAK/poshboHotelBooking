const mongoose = require('mongoose');
const walletHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Booking'
  },
  creditedAmount: {
    type:Number
  },
  transactionId: {
    type:String
  }
},
  { timestamps: true }
);

module.exports = mongoose.model('Wallet', walletHistorySchema); 
