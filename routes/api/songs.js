const express = require('express');
const router = express.Router();
const Song = require('../../models/song')

//GET ALL SONGS
router.get('/', (req, res) => {
    //retrive all songs from the MongoDB
    Song.find({}, (err, songs) => {
        if (err) return res.status(400).send('Error');

        res.send(songs);
    });
});

//GET ONE SONG

//CREATE SONG
router.post('/', (req, res) => {
    //create new song
    const song = new Song(req.body)
    song.save((err, result) => {
        if (err) return res.status(400).send('Error')

        res.status(200).send(result);
    });
})

//UPDATE SONG

//DELETE SONG






module.exports = router;