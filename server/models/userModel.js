const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo')
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

const userSchema = new Schema({
  name: String,
  first_name: String,
  last_name: String,
  username: {
    type: String,
    default: null
  },
  password: {
    type: String,
    default: null
  },
  email: String,
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  photo_profile: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema)
module.exports = User
