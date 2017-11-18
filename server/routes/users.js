const router = require('express').Router()
const users = require('../controllers/userControllers')

router.post('/', users.create)
router.get('/', users.getAll)
router.put('/:id', users.update)
router.delete('/:id', users.remove)

module.exports = router
