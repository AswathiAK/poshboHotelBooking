const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  is_host: {
    type: Boolean,
    //required: true
  }
});

module.exports = mongoose.model('User', userSchema);