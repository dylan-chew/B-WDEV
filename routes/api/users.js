//Imports
const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//Import custom module for validation
const validateUser = require('../../custom_modules/validateUser');
const validateLogin = require('../../custom_modules/validateLogin');

router.post('/', (req, res) => {
    return res.status(200).send('Users API')
})

//REGISTER NEW USER
router.post('/register', (req, res) => {
    // //Grab list of current emails in DB to test against in joi
    // User.find({ email: req.body.email }, (err, users) => {
    //     let array = []
    //     users.forEach(user => {

    //         array.push(user.email)
    //     })
    // });

    //validate new user using joi
    const { error } = validateUser(req.body);

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

//LOGIN existing User
router.post('/login', (req, res) => {
    //ADD VALIDATION
    const {error} = validateLogin(req.body, req);

    if (error) return res.status(400).send(error.details[0].message);
 
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(400).send('Error');
        //handle no user found
        if (!user) return res.status(404).send('Error: No User Found');

        //see if posted password matches bcrypt hashing
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) return res.status(400).send(`Error: ${err.message}`)

            if (!isMatch) return res.status(400).send(`Error: Incorrect Password!`)

            //get JWT and add it to header
            jwt.sign({ user: user.firstName + user.lastName }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                res.header('Access-Control-Expose-Headers', '*')
                res.header('x-auth-token', token);

                res.send('Successfully Logged In');
            });
        })
    });
})

module.exports = router;