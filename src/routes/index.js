const express = require('express');
const actorRouter = require('./actor.router');
const genresRouter = require('./genre.router');
const directorRouter = require('./director.router');
const movieRouter = require('./movie.router');
const router = express.Router();

router.use('/genres', genresRouter)
router.use('/actors', actorRouter)
router.use('/directors', directorRouter)
router.use('/movies', movieRouter)


module.exports = router;