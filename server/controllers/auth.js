const config = require('../config');
const jwt = require('jsonwebtoken')
const { emailTemp } = require('../helpers/email')
const { comparePassword, hashPassword } = require('../helpers/auth')
const User = require('../models/User')

//nanoid is an ES6 module package, while I mostly use CommonJS
let nanoid;
try {
    nanoid = require('nanoid');
} catch (err) {
    nanoid = import('nanoid');
}

module.exports.welcome = (req, res) => {
    res.send("This is /api home page")
}

module.exports.login = (req, res) => {
    res.json({
        msg: 'Welcome to login page',
    })
}

/* 
So, this preRegister will receive user input from the React front-end
and use them to make a expireable activate token. Then it will use AWS SES to
send a email to the user provided email address with the token. The token
will then be used in '/register'
*/
module.exports.preRegister = async (req, res) => {
    try {
        //console.log(req.body)
        //const emailSent = true; ... will use AWS to sent email, if AWS return sent then emailSent = true
        const { email, password } = req.body;
        //when user try to register, they will receive a token that expires in certain amount of time
        const token = jwt.sign({ email, password }, config.JWT_SECRET, {
            expiresIn: '1h',
        })

        config.AWS_SES.sendEmail(emailTemp(email, `
            <p>Click on the link below to activate acount.</p>
            <a href="${config.CLIENT_URL}/auth/account-activate/${token}">Active my account</a>
        `, config.REPLY_TO,
            "Activate Your Account"),
            (e, data) => {
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

module.exports.register = async (req, res) => {
    try {
        //console.log(req.body);
        const { email, password } = jwt.verify(req.body.token, config.JWT_SECRET);
        //decoded or {email, password} is a JSON = {email, password, iat, exp}
        const hashedPassword = await hashPassword(password); //hashedPassword has a Promise, gotta use await
        const newUser = await new User({
            username: "test1",
            email,
            password: hashedPassword,
        }).save(); //saving new instance also need await, so it's good to put it behind that.

        const token = jwt.sign({ _id: newUser._id }, config.JWT_SECRET, {
            expiresIn: '1h'
        });

        const refreshToken = jwt.sign({ _id: newUser._id }, config.JWT_SECRET, {
            expiresIn: '7d'
        });

        newUser.password = undefined;
        newUser.resetCode = undefined;

        return res.json({
            token,
            refreshToken,
            newUser,
        })
    } catch (err) {
        console.log(err);
        return res.json({ error: "Error occur. Please try again." })
    }
}