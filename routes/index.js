const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { validationSignup, validationSignin } = require('../utils/validation');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

const userRouter = require('./users');

router.use('/users', auth, userRouter);
router.post('/signin', validationSignin, login);
router.post('/signup', validationSignup, createUser);
router.use('*', auth, (req, res, next) => next(new NotFoundError('Запрашиваемый адрес не найден')));

module.exports = router;
