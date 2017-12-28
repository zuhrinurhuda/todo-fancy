// require model
const User = require('../models/userModel')

class UserController {
  static create (req, res) {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      picture: req.body.photo_profile
    })
  
    newUser.save()
    .then(newUser => res.status(200).json({
      message: 'Succes create new user',
      data: newUser
    }))
    .catch(err => res.status(500).send(err))
  }
  
  static findAll (req, res) {
    User.find()
    .then(users => res.status(200).json({
      message: 'Succes find all users',
      data: users
    }))
    .catch(err => res.status(500).send(err))
  }
  
  static update (req, res) {
    User.findById(req.params.id)
    .then(user => {
      user.name = req.body.name || user.name
      user.gender = req.body.gender || user.gender
      user.picture = req.body.picture || user.picture
      user.updatedAt = new Date()
  
      user.save()
      .then(newUserData => res.status(200).json({
        message: 'Succes update user data',
        data: newUserData
      }))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }
  
  static delete (req, res) {
    User.findByIdAndRemove(req.params.id)
    .then(deletedUser => res.status(200).json({
      message: 'Succes delete user',
      data: deletedUser
    }))
    .catch(err => res.status(500).send(err))
  }
}

module.exports = UserController
