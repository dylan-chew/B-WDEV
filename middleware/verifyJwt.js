// //import jwt
const jwt = require('jsonwebtoken');

function verifyJwt(req, res, next) {
    //grab the token from the header
    const tokenToVerify = req.header('x-auth-token')
    if (tokenToVerify === undefined) return res.status('401').send(`Access is Denied`)

    jwt.verify(tokenToVerify, process.env.JWT_SECRET, (err, decoded) => {
        //if there is an error respond with a 401 (unauthorized)
        if (err) return res.status('401').send(`Access is Denied`)

        //if no err then continue on to next (final) middleware
        return next();
    })
}

module.exports = verifyJwt;