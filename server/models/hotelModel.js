const mongoose = require("mongoose");
const hotelSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required:true
  },
  type: {
    type: String,
    required:true
  },
  title: {
    type: String,
    //required:true
  },
  city: {
    type: String,
    required:true
  },
  address: {
    type: String,
    required:true
  },
  photos: {
    type:[String],
  },
  description: {
    type: String,
    required:true
  },
  perks: {
    type:[String]
  },
  extraInfo: {
    type: String,
  },
  checkInTime: {
    type:String
  },
  checkOutTime: {
    type:String
  },   
  rooms:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Room'
  }],
  cheapestPrice: {
    type: Number
    //required:true
  },
  documentProof: {
    type:String,
  },  
  isVerified: {
    type: Boolean,
    default:false
  },
  isBlock: {
    type: Boolean,
    default:false
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Review'
  }]
});
module.exports = mongoose.model('Hotel', hotelSchema);

