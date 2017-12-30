// require library
const router = require('express').Router()

// require middleware
const checkAuth = require('../middleware/checkAuth')

// require controller
const taskController = require('../controllers/taskController')

// create
router.post('/', checkAuth.isLogin, taskController.create)

// read
router.get('/all', taskController.findAll)
router.get('/', checkAuth.isLogin, taskController.findByUser)

// update
router.put('/:id/changestatus', checkAuth.isLogin, checkAuth.isVerifyUser, taskController.changeStatus)
router.put('/:id', checkAuth.isLogin, checkAuth.isVerifyUser, taskController.update)

// delete
router.delete('/:id', checkAuth.isLogin, checkAuth.isVerifyUser, taskController.delete)

module.exports = router
