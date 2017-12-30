// require model
const Task = require('../models/taskModel')

class TaskController {
  static create (req, res) {
    let tagsArr = req.body.tags.split(',')
    let newTask = new Task({
      user: req.decoded._id,
      task: req.body.name,
      description: req.body.description,
      tags: tagsArr
    })

    newTask.save()
    .then(newTask => res.status(200).json({
      message: 'Success create new task',
      task: newTask
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

  static findByUser(req, res) {
    Task.find({ user: req.decoded._id })
    // .populate('user')
    .then(tasks => res.status(200).json({
      message: 'Success find user tasks',
      userTasks: tasks
    }))
    .catch(err => res.status(500).send(err))
  }
  
  static update (req, res) {
    Task.findById(req.decoded._id)
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

  static changeStatus (req, res) {
    Task.findById(req.params.id)
    .then(task => {
      if (task.complete) {
        task.complete = false
      } else {
        task.complete = true
      }
      task.completedAt = new Date()

      task.save()
      .then(newTaskData => res.status(200).json({
        message: 'Success update task data',
        task: newTaskData
      }))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }

  static delete (req, res) {
    Task.findByIdAndRemove(req.params.id)
    .then(deletedTask => res.status(200).json({
      message: 'Success delete task',
      deletedTask: deletedTask
    }))
    .catch(err => res.status(500).send(err))
  }
}

module.exports = TaskController