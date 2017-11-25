const User = require('../models/userModel')
const ObjectId = require('mongodb').ObjectId
const passHash = require('../helpers/passHash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const create = (req, res) => {
  console.log(req.body.userID);
  User.findOne({userID: req.body.userID})
  .then(user => {
    if(user) {

    } else {
      passHash(req.body.password, encryptedPass => {
        let user = new User({
          name: req.body.name,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          password: encryptedPass,
          email: req.body.email,
          gender: req.body.gender,
          photo_profile: req.body.photo_profile,
          isAdmin: req.body.isAdmin
        })
      
        user.save()
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err))
      })
    }
  })
  .catch(err => {
    res.status(500).send(err)
  })
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
  .then(user => res.send(user))
  .catch(err => res.status(500).send(err))
}

const login = (req, res) => {
  User.findOne({username: req.body.username})
  .then(user => {
    console.log(user);
    bcrypt.compare(req.body.password, user.password)
    .then(success => {
      let payload = {
        id: user.id,
        email: user.email,
        isLogin: true,
        isAdmin: user.isAdmin
      }

      jwt.sign(payload, 'hacktiv8', {expiresIn: '1h'}, (err, token) => {
        console.log(token);
        if(err) res.status(500).send(err)
        else res.send({
          msg: 'Login success',
          token: token
        })
      })
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
