const router = require('express').Router();
const users = require('../controllers/userControllers')
const checkAuth = require('../middleware/checkAuth')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
router.post('/login', users.login)

module.exports = router;
