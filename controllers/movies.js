const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequest = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found-err');
const Forbidden = require('../errors/forbidden');

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Movie.create({ name, link, owner })
    .then((card) => Movie.findById(card._id).populate('owner'))
    .then((card) => res.status(201).send({ data: card }))
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
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      if (card.owner.toString() !== req.user._id) {
        return next(
          new Forbidden('Вы не можете удалить карточку другого пользователя'),
        );
      }
      return Movie.findByIdAndDelete(req.params.cardId).then(() => res.send({ data: card }));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequest('Некорректно введенные данные'));
      }
      next(err);
    });
};
