const router = require('express').Router()
const users = require('../controllers/userControllers')
const checkAuth = require('../middleware/checkAuth')

router.post('/', users.create)
router.post('/login', users.login)
router.get('/', users.getAll) //checkAuth.isLogin, checkAuth.isAdmin,
router.put('/:id', users.update) //checkAuth.isLogin, checkAuth.isAdmin,
router.delete('/:id', users.remove) //checkAuth.isLogin, checkAuth.isAdmin, 

module.exports = router
