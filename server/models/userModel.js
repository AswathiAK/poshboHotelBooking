const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,    
  },
  isBlock: {
    type: Boolean,
    default:false
  },
  wallet: {
    type: Number,
    default:0
  }
});

module.exports = mongoose.model('User', userSchema);