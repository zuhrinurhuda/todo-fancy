const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  task: String,
  subtasks: [{
    type: String,
    default: []
  }],
  description: String,
  tags: [{
    type: String,
    default: []
  }],
  attachments: [{
    type: String,
    default: []
  }],
  comments: [{
    type: String,
    default: []
  }],
  complete: {
    type: Boolean,
    default: false
  },
  completeAt: {
    type: Date,
    default: null
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Task', taskSchema)
