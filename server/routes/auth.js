const express = require('express');

const router = express.Router()

router.get('/', (req, res) => {
    res.send("This is /api home page")
})

router.get('/login', (req, res) => {
    res.json({
        msg: 'Welcome to login page',
    })
})

module.exports = router;