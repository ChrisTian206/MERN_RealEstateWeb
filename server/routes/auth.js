const express = require('express');
const router = express.Router()

//using a controller further organize your code.
//just need to pass the functions in
const ctrl = require('../controllers/auth')

router.get('/', ctrl.welcome);
router.post('/pre-register', ctrl.preRegister);

router.get('/login', ctrl.login)

module.exports = router;