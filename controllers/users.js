const mongoose = require('mongoose');
const User = require('../models/user');
const BadRequest = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found-err');

module.exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Нет пользователя с таким id'));
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequest('Переданы некорректные данные'));
      }
      next(err);
    });
};
