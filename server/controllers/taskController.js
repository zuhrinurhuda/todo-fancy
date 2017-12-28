// require model
const Task = require('../models/taskModel')

class TaskController {
  static create (req, res) {
    let newTask = new Task({
      // user: req.decoded._id,
      task: req.body.task,
      description: req.body.description,
      tags: req.body.tags
    })

    newTask.save()
    .then(newTask => res.status(200).json({
      message: 'Success create new task',
      data: newTask
    }))
    .catch(err => res.status(500).send(err))
  }

  static findAll (req, res) {
    Task.find()
    .then(tasks => res.status(200).json({
      message: 'Success find all tasks',
      data: tasks
    }))
    .catch(err => res.status(500).send(err))
  }

  static update (req, res) {
    Task.findById(req.params.id)
    .then(task => {
      task.task = req.body.task || task.task,
      task.description = req.body.description || task.description
      task.tags = req.body.tags || task.tags
      task.updateAt = new Date()
  
      task.save()
      .then(newTaskData => res.status(200).json({
        message: 'Success update task data',
        data: newTaskData
      }))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }

  static delete (req, res) {
    Task.findByIdAndRemove(req.params.id)
    .then(deletedTask => res.status(200).json({
      message: 'Success delete task',
      data: deletedTask
    }))
    .catch(err => res.status(500).send(err))
  }
}

module.exports = TaskController