const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo')
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

const taskSchema = new Schema({
  user: {
    type: ObjectId,
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

const Task = mongoose.model('Task', taskSchema)
module.exports = Task
