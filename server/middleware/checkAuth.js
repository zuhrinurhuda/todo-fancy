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
    // console.log('headers', req.headers.user)
    // console.log('params', req.params.id)
    // console.log('body', req.body.user)
    // console.log('decoded', req.decoded._id)
    if (req.decoded.isAdmin || req.decoded._id === req.headers.user) {
      next()
    } else {
      res.status(403).send('Only admin or verify user can access')
    }
  }
}

module.exports = CheckAuth
