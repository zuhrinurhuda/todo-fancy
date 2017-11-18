const router = require('express').Router()
const tasks = require('../controllers/taskControllers')

router.post('/', tasks.create)
router.get('/', tasks.getAll)
router.put('/:id', tasks.updateTask)
router.delete('/:id', tasks.remove)


module.exports = router
