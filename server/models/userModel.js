const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  picture: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  updatedAt: {
    type: Date,
    default: null
  }
})

module.exports = mongoose.model('User', userSchema)
