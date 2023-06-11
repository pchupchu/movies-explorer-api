const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(
      new Unauthorized(
        'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
      ),
    );
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
    );
  } catch (err) {
    return next(
      new Unauthorized(
        'При авторизации произошла ошибка. Переданный токен некорректен.',
      ),
    );
  }

  req.user = payload;

  next();
};
