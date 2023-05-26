const { getAll, create, getOne, remove, update, setMoviesActors, setMoviesDirectors, setMoviesGenres } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/:id/actors')
    .post(setMoviesActors)

movieRouter.route('/:id/directors')
    .post(setMoviesDirectors)

movieRouter.route('/:id/genres')
    .post(setMoviesGenres)    

module.exports = movieRouter;