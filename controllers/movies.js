const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequest = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found-err');
const Forbidden = require('../errors/forbidden');

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner,
  })
    .then((movie) => Movie.findById(movie._id).populate('owner'))
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(
          new BadRequest('Переданы некорректные данные при создании карточки'),
        );
      }
      next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => {
      const userMovies = movies.filter((movie) => movie.owner.id === req.user._id);
      res.send({ data: userMovies });
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм с указанным _id не найден'));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(
          new Forbidden('Вы не можете удалить фильм другого пользователя'),
        );
      }
      return Movie.findByIdAndDelete(req.params.movieId).then(() => res.send({ data: movie }));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequest('Некорректно введенные данные'));
      }
      next(err);
    });
};
