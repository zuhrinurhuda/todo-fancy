// require library
const router = require('express').Router()

// require controller
const tasks = require('../controllers/taskControllers')
const checkAuth = require('../middleware/checkAuth')

// create
router.post('/', tasks.create)

// read
router.get('/', tasks.getAll)

// update
router.put('/:id', tasks.updateTask)

// delete
router.delete('/:id', tasks.remove)

module.exports = router
