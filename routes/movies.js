const router = require('express').Router();
const {
  createMovie,
  getMovies, deleteMovie,
} = require('../controllers/movies');
const { validationCreateMovie, validationMovieId } = require('../utils/validation');

router.get('/', getMovies);
router.post('/', validationCreateMovie, createMovie);
router.delete('/:movieId', validationMovieId, deleteMovie);

module.exports = router;
