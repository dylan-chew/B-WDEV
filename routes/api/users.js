//Imports
const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const bcrypt = require('bcrypt');
//Import custom module for validation
const validateUser = require('../../custom_modules/validateUser');

router.post('/', (req, res) => {
    return res.status(200).send('Users API')
})

//Register new User
router.post('/register', (req, res) => {
    //validate new user using joi
    const { error } = validateUser(req.body, req);

    if (error) return res.status(400).send(error.details[0].message);

    //Once passes joi validation then encrypt the password to be saved on the DB
    bcrypt.genSalt((err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            let passwordBcrypt = hash;

            //once password encrypted save it wiht a new "encrypted" object
            const newUserBcrptyed = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: passwordBcrypt
            }

            const newUser = new User(newUserBcrptyed)

            newUser.save((err, newUserBcrptyed) => {
                if (err) return res.status(400).send(`Error: ${err.message}`)

                console.log(newUserBcrptyed)
                res.status(201).send(newUserBcrptyed);
            });
        })
    })
})

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

//Login existing User
router.post('/login', (req, res) => {
    //validate new user using joi
    const { error } = validateUser(req.body, req);

    if (error) return res.status(400).send(error.details[0].message);

    //Once passes joi validation then encrypt the password to be saved on the DB
    bcrypt.genSalt((err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            let passwordBcrypt = hash;

            //once password encrypted save it wiht a new "encrypted" object
            const newUserBcrptyed = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: passwordBcrypt
            }

            const newUser = new User(newUserBcrptyed)

            newUser.save((err, newUserBcrptyed) => {
                if (err) return res.status(400).send(`Error: ${err.message}`)

                console.log(newUserBcrptyed)
                res.status(201).send(newUserBcrptyed);
            });
        })
    })
})

module.exports = router;