// require libraries
const FB = require('fb');
const fb = new FB.Facebook({version: 'v2.8'});

module.exports = (req, res, next) => {
  FB.setAccessToken(req.body.accessToken);
  next()
}
