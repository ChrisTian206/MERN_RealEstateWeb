const express = require('express');
const router = express.Router()
const { requireSignin } = require('../middleware/auth');
//using a controller further organize your code.
//just need to pass the functions in
const ctrl = require('../controllers/ad')

router.post('/upload-images', requireSignin, ctrl.uploadImage);

module.exports = router;