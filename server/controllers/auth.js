module.exports.welcome = (req, res) => {
    res.send("This is /api home page")
}

module.exports.login = (req, res) => {
    res.json({
        msg: 'Welcome to login page',
    })
}