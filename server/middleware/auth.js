const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config')

module.exports.requireSignin = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, JWT_SECRET);
        req.user = decoded;
        /**
         * When user sign in, they will pass the token in as req. Each user
         * has their own token which was generated using their user._id
         * When we decode the token, we are able to get their user._id then
         * we will be able to find that specific user
         */
        console.log(decoded)
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: "invalid or expired token, please try again." });//401: unauthorized
    }
}