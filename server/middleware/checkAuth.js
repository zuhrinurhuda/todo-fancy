const jwt = require('jsonwebtoken')

class CheckAuth {
  static isLogin (req, res, next) {
    jwt.verify(req.headers.accesstoken, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (!err) {
        req.decoded = decoded
        next()
      } else {
        res.status(403).send(err)
      }
    })
  }

  static isVerifyUser (req, res, next) {
    if (req.decoded.isAdmin || req.decoded._id === req.params.id) {
      next()
    } else {
      res.status(403).send('Only admin or verify user can access')
    }
  }
}

module.exports = CheckAuth
