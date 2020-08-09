const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authentication');

const {
  getUser,
  getUsers,
  updateName,
  updateEmail,
  deleteMe,
  deleteUser,
  setParamsId,
} = require('../controllers/user');

const {
  requireLogIn,
  requirePassword,
  restrictTo,
} = require('../controllers/authentication');

const router = express.Router();

router.post('/signup', signup);
router.get('/login', login);
router.post('/password/forgot', forgotPassword);
router.patch('/password/reset/:token', resetPassword);

router.get('/me', requireLogIn, setParamsId, getUser);

router.use(requireLogIn, requirePassword);

router.patch('/password/update', updatePassword);
router.patch('/name/update', updateName);
router.patch('/email/update', updateEmail);
router.delete('/delete', deleteMe);

router.use(restrictTo('admin'));

router.route('/').get(getUsers);
router.route('/:id').get(getUser).delete(deleteUser);

module.exports = router;
