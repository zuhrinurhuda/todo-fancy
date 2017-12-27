// require library
const router = require('express').Router()

// Home page
router.get('/', function(req, res, next) {
  res.send('Hello World')
})

module.exports = router
