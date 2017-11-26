// require libraries
const router = require('express').Router()
const users = require('../controllers/userControllers')

// require middleware
const checkAuth = require('../middleware/checkAuth')
const setAccessToken = require('../middleware/checkToken')

// website routes
router.post('/', setAccessToken, users.create)
router.post('/login', users.login)
router.get('/', users.getAll) //checkAuth.isLogin, checkAuth.isAdmin,
router.put('/:id', users.update) //checkAuth.isLogin, checkAuth.isAdmin,
router.delete('/:id', users.remove) //checkAuth.isLogin, checkAuth.isAdmin,

module.exports = router
