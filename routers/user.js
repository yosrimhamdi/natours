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
  logOut,
} = require('../controllers/authentication');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logOut);
router.post('/password/forgot', forgotPassword);
router.patch('/password/reset/:token', resetPassword);

router.get('/me', requireLogIn, setParamsId, getUser);

router.use(requireLogIn, requirePassword);

router.patch('/admin/update/password', updatePassword);
router.patch('/admin/update/name', updateName);
router.patch('/admin/update/email', updateEmail);
router.delete('/admin/delete', deleteMe);

router.use(restrictTo('admin'));

router.route('/').get(getUsers);
router.route('/:id').get(getUser).delete(deleteUser);

module.exports = router;
