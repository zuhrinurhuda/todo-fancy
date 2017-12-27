// require library
const router = require('express').Router()

// require controller
const taskController = require('../controllers/taskController')

// create
router.post('/', taskController.create)

// read
router.get('/', taskController.findAll)

// update
router.put('/:id', taskController.update)

// delete
router.delete('/:id', taskController.delete)

module.exports = router
