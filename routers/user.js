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
  updateMe,
  deleteMe,
  deleteUser,
  setParamsId,
  uploadUserPhoto,
} = require('../controllers/user');

const { requireLogIn, restrictTo, logOut } = require('../controllers/authentication');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logOut);
router.post('/password/forgot', forgotPassword);
router.patch('/password/reset/:token', resetPassword);

router.use(requireLogIn);

router.get('/me', setParamsId, getUser);

router.patch('/admin/update', uploadUserPhoto, updateMe);
router.patch('/admin/update/password', updatePassword);
router.delete('/admin/delete', deleteMe);

router.use(restrictTo('admin'));

router.route('/').get(getUsers);
router.route('/:id').get(getUser).delete(deleteUser);

module.exports = router;
