const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.validationSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
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
    name: Joi.string().min(2).max(30),
    email: Joi.string()
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
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
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
  }),
});

module.exports.validationMovieId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});
