const mongoose = require('mongoose')
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

const userSchema = new Schema({
  userID: Schema.Types.ObjectId,
  name: String,
  first_name: String,
  last_name: String,
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: String,
  email: String,
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  picture: {
    type: String,
    default: null
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: null
  }
});

const User = mongoose.model('User', userSchema)
module.exports = User
