const router = require('express').Router()
const tasks = require('../controllers/taskControllers')
const checkAuth = require('../middleware/checkAuth')

router.post('/', tasks.create) //checkAuth.isLogin, checkAuth.isAdmin,
router.get('/', tasks.getAll) //checkAuth.isLogin, checkAuth.isAdmin,
router.get('/:userId', tasks.getByUserId)
router.put('/:id', tasks.updateTask) //checkAuth.isLogin, checkAuth.isAuthUser,
router.delete('/:id', tasks.remove) //checkAuth.isLogin, checkAuth.isAuthUser,


module.exports = router
