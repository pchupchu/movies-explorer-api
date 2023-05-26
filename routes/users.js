const router = require('express').Router();
const {
  updateUser,
  getUser,
} = require('../controllers/users');
const { validationUpdateUser } = require('../utils/validation');

router.get('/me', getUser);
router.patch('/me', validationUpdateUser, updateUser);

module.exports = router;
