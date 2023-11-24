const config = require('../config');
const jwt = require('jsonwebtoken')
const { emailTemp } = require('../helpers/email')
const { comparePassword, hashPassword } = require('../helpers/auth')
const User = require('../models/User')
const emailValidator = require('email-validator')

//nanoid is an ES6 module package
//Since I use commonJS, I will use uuid instead

const { v4: uuid } = require('uuid')

module.exports.welcome = (req, res) => {
    res.send("This is /api home page")
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

        //validate
        if (!emailValidator.validate(email)) {
            return res.json({ error: "invalid email address" })
        }
        if (!password) { return res.json({ error: "missing password" }) }
        if (password && password?.length < 6) { return res.json({ error: "password length should be at least 6 chars" }) }

        const user = await User.findOne({ email });
        if (user) { return res.json({ error: "This email is used" }) }

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
        const userExist = await User.findOne({ email });
        if (userExist) { return res.json({ error: "This email is used" }) }
        //decoded or {email, password} is a JSON = {email, password, iat, exp}
        const hashedPassword = await hashPassword(password); //hashedPassword has a Promise, gotta use await
        const user = await new User({
            username: uuid(),
            email,
            password: hashedPassword,
        }).save(); //saving new instance also need await, so it's good to put it behind that.

        const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
            expiresIn: '1h'
        });

        const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
            expiresIn: '7d'
        });


        /** This process prevent use's hashedpassword being respond 
         * to the other end. Because I will return res.json().
         * Anyway, user's hashedpassword is actually saved in DB.
         */
        user.password = undefined;
        user.resetCode = undefined;

        return res.json({
            token,
            refreshToken,
            user,
        })
    } catch (err) {
        console.log(err);
        return res.json({ error: "Error occur. Please try again." })
    }
}


module.exports.login = async (req, res) => {
    try {
        //1. find the user
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) { return res.json({ error: "invalid email address" }) }

        //2 compare password
        const match = await comparePassword(password, user.password);
        if (!match) { return res.json({ error: "incorrect password" }) };

        //3. create JWT token
        //Haha, you might ask why give them token for singin in.... Great question!
        //token is given to users to be included in the headers of the post request
        //Remember, REST architecture is stateless meaning it don't remember what 
        //happened in previous steps. Having this token which can be verified, 
        //help our server to know this user is authenticatated. Server will then
        //allow this user to visit or update protected data.

        //also, keep in mind the token here contains the user id, not email/password
        const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
            expiresIn: '1h'
        });

        const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
            expiresIn: '7d'
        });

        //4 send the response
        user.password = undefined;
        user.resetCode = undefined;

        return res.json({
            token,
            refreshToken,
            user,
        })
    } catch (err) {
        console.log(err);
        return res.json({ error: "Error occur. Please try again." })
    }
}

module.exports.forgotPassword = (async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (!user) { return res.json({ error: "invalid email address" }) }
        else {
            const resetCode = uuid();
            user.resetCode = resetCode;
            user.save()
            const token = jwt.sign({ resetCode }, config.JWT_SECRET, {
                expiresIn: '1h'
            });

            config.AWS_SES.sendEmail(
                emailTemp(email, `
                    <p>Click the link to access your account</p>
                    <a href="${config.CLIENT_URL}/auth/access-account/${token}">Access Your Account</a>
                `, config.REPLY_TO, 'Access your account'),
                (e, data) => {
                    if (e) {
                        console.log(e)
                        return res.json({ ok: false })
                    } else {
                        console.log(data)
                        return res.json({ ok: true })
                    }
                }
            )
        }
    } catch (err) {
        console.log(err);
        return res.json({ error: "Error occur. Please try again." })
    }
})


module.exports.accessAccount = async (req, res) => {
    try {
        const { resetCode } = jwt.verify(req.body.resetCode, config.JWT_SECRET);//req.body.resetCode will be passed in via POST request

        const user = await User.findOneAndUpdate(
            { resetCode }, //find by the above resetCode
            { resetCode: '' } // once find, erase it. So that this user won't be able to access via this resetCode
        )

        const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
            expiresIn: '1h'
        });

        const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
            expiresIn: '7d'
        });

        //4 send the response
        user.password = undefined;
        user.resetCode = undefined;

        return res.json({
            token,
            refreshToken,
            user,
        })
    } catch (err) {
        console.log(err);
        return res.json({ error: "Error occur. Please try again." })
    }
}

module.exports.refreshToken = async (req, res) => {
    try {
        //refresh_token was previous named refreshToken, it didn't work. Guess it overlapse with function name
        const { _id } = jwt.verify(req.headers.refresh_token, config.JWT_SECRET);
        const user = await User.findById(_id);

        //now give the user a fresh new token
        const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
            expiresIn: '1h'
        });

        const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
            expiresIn: '7d'
        });

        //4 send the response
        user.password = undefined;
        user.resetCode = undefined;

        return res.json({
            token,
            refreshToken,
            user,
        });

    } catch (err) {
        console.log(err);
        //403 Forbidden
        return res.status(403).json({ error: "Failed to refresh token." })
    }
}

module.exports.currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.password = undefined;
        user.resetCode = undefined;
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: "Unauthorized to show current user" })
    }
}

module.exports.publicProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        user.password = undefined;
        user.resetCode = undefined;
        res.json(user);
    } catch (err) {
        console.log(err);
        return res.json({ error: "user not found..." })
    }
}

module.exports.updatePassword = async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) return res.json({ error: "password is required." })
        if (password && password.length < 6) return res.json({ error: "password length be at least 6 chars" })

        //!!!!!!!!REMEMBER TO ADD await FOR User.find !!!!!!!
        const user = await User.findByIdAndUpdate(req.user._id, {
            password: await hashPassword(password)
        })


        res.json({ ok: true });
    } catch (err) {
        console.log(err);
        return res.json({ error: "Unauthorized to update password" })
    }
}

module.exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true })
        user.password = undefined;
        user.resetCode = undefined;
        res.json(user);
    } catch (err) {
        console.log(err)
        if (err.codeName === "DuplicateKey") {
            //check user schema for field restrictions
            return res.json({ error: "Email is already taken" })
        } else {
            return res.json({ error: "Unauthorized to update profile" })
        }
    }
}