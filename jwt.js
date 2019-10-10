const jwt = require('jsonwebtoken');


jwt.sign({ user: "MikeCaines" }, process.env.JWT_SECRET, (err, token) => {
    console.log(token);
});

jwt.verify('token', '')