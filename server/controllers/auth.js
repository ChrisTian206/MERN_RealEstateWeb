module.exports.welcome = (req, res) => {
    res.send("This is /api home page")
}

module.exports.login = (req, res) => {
    res.json({
        msg: 'Welcome to login page',
    })
}

module.exports.preRegister = async (req, res) => {
    try {
        console.log(req.body)
        const emailSent = true; //will use AWS to sent email, if AWS return sent then emailSent = true

        if (emailSent) { return res.json({ ok: true }) } else { return res.json({ ok: false }) }
    } catch (err) {
        console.log(err);
        return res.json({ error: "Error occur, please try again." })
    }
}