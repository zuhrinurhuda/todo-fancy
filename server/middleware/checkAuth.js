const jwt = require('jsonwebtoken')

const isLogin = (req, res, next) => {
  jwt.verify(req.headers.token, 'hacktiv8', function(err, decoded) {
    if(err) {
      res.status(500).send(err)
    }
    else {
      req.verifyUser = decoded
      next()
    }
  });
}

const isAdmin = (req, res, next) => {
  if(req.verifyUser.isAdmin) {
    next()
  } else {
    res.send('only Admin can access')
  }
}

const isAuthUser = (req, res, next) => {
  if(req.verifyUser.isAdmin || req.verifyUser.id == req.params.id) {
    next()
  } else {
    res.send('only Admin or Authenticate User can access')
  }
}

module.exports = {
  isLogin,
  isAdmin,
  isAuthUser
};
