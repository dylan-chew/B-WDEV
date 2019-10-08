const express = require('express');
const router = express.Router();
const Film = require('../../models/film')

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

        res.send(film);
    });
});

//CREATE FILM
router.post('/', (req, res) => {
    const film = new Film(req.body)
    film.save((err, result) => {
        if (err) return res.status(400).send('Error')

        res.status(200).send(result);
    });
})

//UPDATE FILM

//DELETE FILM
router.delete('/:_id', (req, res) => {
    Film.findByIdAndRemove(req.params._id, (err, film) => {
        if (err) return res.status(400).send('Error')

        res.status(204).send()
    });
})

module.exports = router;