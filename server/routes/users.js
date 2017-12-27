// require library
const router = require('express').Router()

// require controller
const userController = require('../controllers/userController')

// create
router.post('/', userController.create)

// read
router.get('/', userController.findAll)

// update
router.put('/:id', userController.update)

// delete
router.delete('/:id', userController.delete)

module.exports = router
