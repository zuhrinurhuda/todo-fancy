// require library
const router = require('express').Router()

// require middleware
const setAccessToken = require('../middleware/setAccessToken')
const checkAuth = require('../middleware/checkAuth')

// require controller
const userController = require('../controllers/userController')

// create
router.post('/login', setAccessToken, userController.login)

// read
router.get('/', checkAuth.isLogin, userController.findById)

// update
router.put('/:id', userController.update)

// delete
router.delete('/:id', userController.delete)

module.exports = router
