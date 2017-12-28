const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (user) => {
  return new Promise((resolve, reject) => {
    let payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      isLogin: true,
      isAdmin: user.isAdmin
    }
    jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'}, (err, token) => {
      if(err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}
