const jwt = require('jsonwebtoken');

function signUser(firstName, lastName) {
    jwt.sign({ user: firstName + lastName }, process.env.JWT_SECRET, (err, token) => {
        //console.log(token);
        return token;
    });
}

// function verifyUser(){
//     jwt.verify('token', '')
// }

module.exports = signUser;
