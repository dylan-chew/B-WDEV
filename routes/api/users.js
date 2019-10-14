//Imports
const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const bcrypt = require('bcrypt');
//Import custom module for validation
const validateUser = require('../../custom_modules/validateUser');
const jwt = require('jsonwebtoken');

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

                returnJson = {
                    id: newUserBcrptyed.id,
                    email: newUserBcrptyed.email
                }

                res.status(201).send(returnJson);
            });
        })
    })
})

//Login existing User
router.post('/login', (req, res) => {
    //ADD VALIDATION


    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(400).send('Error');
        //handle no user found
        if (!user) return res.status(404).send();

        //see if posted password matches bcrypt hashing
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) return res.status(400).send(`Error: ${err.message}`)

            if (!isMatch) return res.status(400).send(`Error: Incorrect Password!`)

            //get JWT and add it to header
            jwt.sign({ user: user.firstName + user.lastName }, process.env.JWT_SECRET, (err, token) => {
                console.log(token);
                res.header('x-auth-token', token);

                res.status(200).send('Successfully Logged In');
            });
        })
    });
})

module.exports = router;