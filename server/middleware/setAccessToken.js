const FB = require('fb')

module.exports = (req, res, next) => {
  FB.setAccessToken(req.headers.accesstoken)
  next()
}