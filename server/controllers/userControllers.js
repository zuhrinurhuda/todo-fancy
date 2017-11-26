// require libraries
const ObjectId = require('mongodb').ObjectId
const FB = require('fb');
const fb = new FB.Facebook({version: 'v2.8'});

// require model
const User = require('../models/userModel')

// require helpers
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

// controllers
const create = (req, res) => {
  if(req.body.accessToken) {
    // create account from facebook data
    FB.api('/me', {fields: ['id', 'name', 'first_name', 'last_name', 'gender', 'picture', 'email']}, function (res) {
      if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error)
        return;
      } else {
        User.findOne({username: res.first_name.toLowerCase()})
        .then(user => {
          if(user) {
            // Jika user sudah terdaftar berikan token jwt-nya
            jwt(user)
            .then(token => {
              // console.log({token: token});
              res.send({token: token})
            })
            .catch(err => console.log(err))
          } else {
            bcrypt.encrypt(res.last_name.toLowerCase())
            .then(encryptedPass => {
              let user = new User({
                name: res.name,
                first_name: res.first_name,
                last_name: res.last_name,
                username: res.first_name.toLowerCase(),
                password: encryptedPass,
                email: res.email,
                gender: res.gender,
                picture: res.picture.data.url
              })
              user.save()
              .then(result => console.log(result))
              .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
          }
        })
        .catch(err => console.log(err))
      }
    })
  } else {
    // manual create account
    bcrypt.encrypt(req.body.password)
    .then(encryptedPass => {
      let user = new User({
        name: req.body.name,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: encryptedPass,
        email: req.body.email,
        gender: req.body.gender,
        isAdmin: req.body.isAdmin
      })
      user.save()
      .then(result => res.send(result))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }
}

const getAll = (req, res) => {
  User.find()
  .then(users => res.send(users))
  .catch(err => res.status(500).send(err))
}

const update = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  User.findById(id)
  .then(user => {
    passHash(user.password, encryptedPass => {
      user.name = req.body.name || user.name
      user.first_name = req.body.first_name || user.first_name
      user.last_name = req.body.last_name || user.last_name
      user.username = req.body.username || user.username
      user.password = encryptedPass || user.password
      user.email = req.body.email || user.email
      user.gender = req.body.gender || user.gender
      user.photo_profile = req.body.photo_profile || user.photo_profile
      user.isAdmin = req.body.isAdmin || user.isAdmin

      user.save()
      .then(result => res.send(result))
      .catch(err => res.status(500).send(err))
    })
  })
  .catch(err => res.status(500).send(err))
}

const remove = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  User.findByIdAndRemove(id)
  .then(() => res.send('Success delete user'))
  .catch(err => res.status(500).send(err))
}

const login = (req, res) => {
  User.findOne({username: req.body.username})
  .then(user => {
    bcrypt.decrypt(req.body.password, user.password)
    .then(success => {
      if(success) {
        jwt(user)
        .then(token => {
          console.log({token: token});
          res.send({token: token})
        })
        .catch(err => console.log(err))
      } else {
        res.send('Login Failed! Incorrect username or password')
      }
    })
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
}

module.exports = {
  create,
  getAll,
  update,
  remove,
  login
};
