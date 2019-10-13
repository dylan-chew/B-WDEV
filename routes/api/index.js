const express = require('express');
const router = express.Router();
const filmRouter = require('./film');
const usersRouter = require('./users');

//hook up the film router
router.use('/film', filmRouter)

//hook up the users router
router.use('/users', usersRouter)

//    api/ is assumed
router.get('/', (req, res) => {
    res.send('Welcome to the api!')
})

module.exports = router;