// require library
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  task: String,
  description: String,
  tags: [{
    type: String,
    default: []
  }],
  complete: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  },
  updatedAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Task', taskSchema)
