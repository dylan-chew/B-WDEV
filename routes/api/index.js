const express = require('express');
const router = express.Router();
const songsRouter = require('./songs');

//hook up the songs router
router.use('/songs', songsRouter)

//    api/ is assumed
router.get('/', (req, res, next) =>{
    res.send('welcome to the api!')
})




module.exports = router;