// require libraries
const ObjectId = require('mongodb').ObjectId

// require model
const Task = require('../models/taskModel')

// controllers
const create = (req, res) => {
  let task = new Task({
    user: ObjectId(req.body.userId),
    task: req.body.task,
    description: req.body.description,
    tags: req.body.tags,
    // attachments: req.body.attachments
  })

  task.save()
  .then(result => res.send(result))
  .catch(err => res.status(500).send(err))
}

const getAll = (req, res) => {
  Task.find() //.populate('user')
  .then(tasks => res.send(tasks))
  .catch(err => res.status(500).send(err))
}

const getByUserId = (req, res) => {
  let user = {user: ObjectId(req.params.userId)}

  Task.find(user) //.populate('user')
  .then(tasks => {
    res.send(tasks)
  })
  .catch(err => res.status(500).send(err))
}

const updateTask = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  Task.findById(id)
  .then(dataTask => {
    dataTask.task = req.body.task || dataTask.task,
    dataTask.description = req.body.description || dataTask.description
    dataTask.tags = req.body.tags || dataTask.tags
    dataTask.comments = req.body.comments || dataTask.comments
    dataTask.updateAt = new Date()
    dataTask.complete = req.body.complete

    dataTask.save()
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
}

const completeTask = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  Task.findById(id)
  .then(dataTask => {
    if(dataTask.complete) {
      dataTask.complete = false
      dataTask.completeAt = null
      dataTask.updateAt = new Date()
    } else {
      dataTask.complete = true
      dataTask.completeAt = new Date()
      dataTask.updateAt = new Date()
    }

    dataTask.save()
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
}

const remove = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  Task.findByIdAndRemove(id)
  .then(task => res.send(task))
  .catch(err => res.status(500).send(err))
}

module.exports = {
  create,
  getAll,
  getByUserId,
  updateTask,
  completeTask,
  remove
}
