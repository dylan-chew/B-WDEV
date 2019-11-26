//Imports
const express = require('express');
const router = express.Router();
const Film = require('../../models/film')
//Import custom module for validation
const validateFilm = require('../../custom_modules/validateFilm');
//Import the middleware
const verifyJwt = require('../../middleware/verifyJwt');


//GET ALL FILM
router.get('/', (req, res) => {
    Film.find({}, (err, film) => {
        if (err) return res.status(400).send('Error');

        res.send(film);
    });
});

//GET ONE FILM 5d9d053f2a5147c37ddae417
router.get('/:_id', (req, res) => {
    Film.findById(req.params._id, (err, film) => {
        if (err) return res.status(400).send('Error');

        //handle no film found
        if (!film) return res.status(404).send();

        res.send(film);
    });
});

//CREATE FILM
router.post('/', verifyJwt, (req, res) => {
    const newFilm = new Film(req.body)

    console.log(req.body)
    //validate new film using joi
    const { error } = validateFilm(req.body, req);

    if (error) return res.status(400).send(error.details[0].message);

    newFilm.save((err, newFilm) => {
        if (err) return res.status(400).send(`Error: ${err.message}`)

        console.log(newFilm)
        res.status(201).send(newFilm);
    });
})

//UPDATE FILM
router.put('/:_id', verifyJwt, (req, res) => {
    const updateFilm = req.body

    //validate new film using joi
    const { error } = validateFilm(updateFilm, req);

    if (error) return res.status(400).send(error.details[0].message);

    Film.findByIdAndUpdate(req.params._id, updateFilm, { new: true }, (err, film) => {
        if (err) return res.status(400).send('Error')

        if(!film) return res.status(404).send();

        res.status(200).send(film);
    });
})

//DELETE FILM
router.delete('/:_id', verifyJwt, (req, res) => {
    Film.findByIdAndRemove(req.params._id, (err, filmToDelete) => {
        if (err) return res.status(400).send('Error')

        if(!filmToDelete) return res.status(404).send();

        res.status(204).send();
    });
})

module.exports = router;