const Task = require('../models/taskModel')
const ObjectId = require('mongodb').ObjectId

const create = (req, res) => {
  let task = new Task({
    task : req.body.task,
    description: req.body.description,
    tags: req.body.tags,
    attachments: req.body.attachments
  })
  
  task.save()
  .then(result => res.send(result))
  .catch(err => res.status(500).send(err))
}

const getAll = (req, res) => {
  Task.find()
  .then(tasks => res.send(tasks))
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
  updateTask,
  remove
}
