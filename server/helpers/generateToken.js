const jwt = require('jsonwebtoken')

module.exports = (user) => {
  return new Promise((resolve, reject) => {
    let payload = {
      _id: user._id,
      isAdmin: user.isAdmin
    }

    jwt.sign(payload, process.env.JWT_SECRET_KEY, function (err, token) {
      if (!err) {
        resolve(token)
      } else {
        reject(err)
      }
    })
  })
}