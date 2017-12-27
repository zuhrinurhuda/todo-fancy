// require library
const router = require('express').Router()

// require controller
<<<<<<< HEAD
const tasks = require('../controllers/taskControllers')
const checkAuth = require('../middleware/checkAuth')
=======
const taskController = require('../controllers/taskController')
>>>>>>> refactor server done

// create
router.post('/', taskController.create)

// read
router.get('/', taskController.findAll)

// update
router.put('/:id', taskController.update)

// delete
router.delete('/:id', taskController.delete)

module.exports = router
