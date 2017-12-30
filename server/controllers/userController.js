// require library
const FB = require('fb')

// require model
const User = require('../models/userModel')

// require helpers
const generateToken = require('../helpers/generateToken')

class UserController {
  static login (req, res) {
    FB.api('/me', { fields: ['id', 'name', 'email', 'gender', 'picture'] }, function (response) {
      if (!response || response.error) {
        console.log(!response ? 'error occurred' : response.error)
        return
      } else {
        // console.log('ini response --> ', response)
        User.findOne({ email: response.email })
        .then(user => {
          if (user) {
            // Jika account sudah ada
            generateToken(user)
            .then(token => res.status(200).json({
              message: 'Log in success',
              accesstoken: token
            }))
            .catch(err => res.status(500).json({
              message: 'Log in failed',
              error: err
            }))
          } else {
            // Jika account belum ada
            let newUser = new User({
              name: response.name,
              email: response.email,
              gender: response.gender,
              picture: response.picture.data.url
            })

            newUser.save()
            .then(newUser => {
              generateToken(newUser)
              .then(token => res.status(200).json({
                message: 'Log in success',
                accesstoken: token
              }))
              .catch(err => res.status(500).json({
                message: 'Log in failed',
                error: err
              }))
            })
            .catch(err => res.status(500).send(err))
          }
        })
      }
    })
  }
  
  static findById (req, res) {
    User.findById(req.decoded._id)
    .then(user => res.status(200).json({
      message: 'Success find user',
      userData: user
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
        message: 'Success update user data',
        userData: newUserData
      }))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }
  
  static delete (req, res) {
    User.findByIdAndRemove(req.params.id)
    .then(deletedUser => res.status(200).json({
      message: 'Success delete user',
      userData: deletedUser
    }))
    .catch(err => res.status(500).send(err))
  }
}

module.exports = UserController
