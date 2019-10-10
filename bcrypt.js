const bcrypt = require('bcrypt');

//register
bcrypt.genSalt((err, salt) => {
    bcrypt.hash('password', salt, (err, hash) => {
        console.log(hash);

        //login
        bcrypt.compare('password', hash, (err, isMatch) => {
            console.log(isMatch);
        })
    })
})