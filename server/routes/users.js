const router = require('express').Router()
const users = require('../controllers/userControllers')
const checkAuth = require('../middleware/checkAuth')

router.post('/', checkAuth.isLogin, checkAuth.isAdmin, users.create)
router.get('/', checkAuth.isLogin, checkAuth.isAdmin, users.getAll)
router.put('/:id', checkAuth.isLogin, checkAuth.isAdmin, users.update)
router.delete('/:id', checkAuth.isLogin, checkAuth.isAdmin, users.remove)

module.exports = router
