const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.validationSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message({
          custom: 'Неправильный формат почты',
        });
      }),
    password: Joi.string().required(),
  }),
});

module.exports.validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message({
          custom: 'Неправильный формат почты',
        });
      }),
    password: Joi.string().required(),
  }),
});

module.exports.validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message({
          custom: 'Неправильный формат почты',
        });
      }),
  }),
});

module.exports.validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .custom((value, helpers) => {
        const options = {
          protocols: ['http', 'https'],
          require_protocol: true,
        };
        if (validator.isURL(value, options)) {
          return value;
        }
        return helpers.message({
          custom: 'Неправильный формат ссылки',
        });
      }),
    trailerLink: Joi.string()
      .required()
      .custom((value, helpers) => {
        const options = {
          protocols: ['http', 'https'],
          require_protocol: true,
        };
        if (validator.isURL(value, options)) {
          return value;
        }
        return helpers.message({
          custom: 'Неправильный формат ссылки',
        });
      }),
    thumbnail: Joi.string()
      .required()
      .custom((value, helpers) => {
        const options = {
          protocols: ['http', 'https'],
          require_protocol: true,
        };
        if (validator.isURL(value, options)) {
          return value;
        }
        return helpers.message({
          custom: 'Неправильный формат ссылки',
        });
      }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validationMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});
