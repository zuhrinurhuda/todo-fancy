const bcrypt = require('bcryptjs')

const encrypt = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if(err) {
          reject(err)
        }
        else {
          password = hash
          resolve(password)
        }
      })
    })
  })
}

const decrypt = (passwordInput, passwordHash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(passwordInput, passwordHash, function(err, match) {
      if(err) {
        reject(err)
      }
      else {
        resolve(match)
      }
    })
  })
}

module.exports = {
  encrypt,
  decrypt
}
