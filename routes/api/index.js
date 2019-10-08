const express = require('express');
const router = express.Router();
const filmRouter = require('./film');

//hook up the film router
router.use('/film', filmRouter)

//    api/ is assumed
router.get('/', (req, res) =>{
    res.send('Welcome to the api!')
})




module.exports = router;