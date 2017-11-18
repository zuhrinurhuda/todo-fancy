const bcrypt = require('bcryptjs')

module.exports = function(password, callback) {
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        password = hash
        callback(password)
      })
  })
}
