const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Your name is required']
  },
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  password: {
    type: String,
    required: [true, 'Username is required']
  }
})

const User = mongoose.model("users", userSchema); 
module.exports = User;
