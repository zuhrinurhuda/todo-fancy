const router = require('express').Router()
const tasks = require('../controllers/taskControllers')
const checkAuth = require('../middleware/checkAuth')

router.post('/', checkAuth.isLogin, checkAuth.isAdmin, tasks.create)
router.get('/', checkAuth.isLogin, checkAuth.isAdmin, tasks.getAll)
router.put('/:id', checkAuth.isLogin, checkAuth.isAuthUser, tasks.updateTask)
router.delete('/:id', checkAuth.isLogin, checkAuth.isAuthUser, tasks.remove)


module.exports = router
