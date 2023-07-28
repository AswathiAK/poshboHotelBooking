const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({  
  title: {
    type: String,
    required:true
  },
  price: {
    type: Number,
    required:true
  },
  maxGuests: {
    type: Number,
    required:true
  },  
  description: {
    type: String,
    required:true
  },
  roomNumbers: [{
    number: Number,
    unAvailableDates: {
      type:[Date]
    }
  }],

});
module.exports = mongoose.model('Room', roomSchema);

