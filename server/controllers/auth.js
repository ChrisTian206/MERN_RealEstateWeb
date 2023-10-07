const config = require('../config');


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
        //const emailSent = true; ... will use AWS to sent email, if AWS return sent then emailSent = true

        config.AWS_SES.sendEmail(
            {
                Source: config.EMAIL_FROM,
                //Destination: req.body.email;
                Destination: {
                    ToAddresses: ["1648370611@qq.com"],
                }
            }
            , (e, data) => {
                if (e) {
                    console.log(e)
                    return res.json({ ok: false })
                } else {
                    console.log(data)
                    return res.json({ ok: true })
                }
            });


    } catch (err) {
        console.log(err);
        return res.json({ error: "Error occur, please try again." })
    }
}