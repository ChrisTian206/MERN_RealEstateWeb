const express = require('express');
const router = express.Router()
const { requireSignin } = require('../middleware/auth');
//using a controller further organize your code.
//just need to pass the functions in
const ctrl = require('../controllers/auth')

router.get('/', requireSignin, ctrl.welcome);
router.post('/pre-register', ctrl.preRegister);
router.post('/register', ctrl.register)
router.post('/login', ctrl.login)
router.post('/forgot-password', ctrl.forgotPassword)
router.post('/access-account', ctrl.accessAccount);

//if token expires, ask a fresh new token
router.get('/refresh-token', ctrl.refreshToken);



module.exports = router;