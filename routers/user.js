const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  requireLogIn,
  requirePassword,
  restrictTo,
} = require('../controllers/authentication');

const { updateName, updateEmail, deleteMe, deleteUser } = require('../controllers/user');

const router = express.Router();

router.route('/:id').delete(requireLogIn, restrictTo('admin'), deleteUser);

router.post('/signup', signup);
router.get('/login', login);

router.post('/password/forgot', forgotPassword);
router.patch('/password/reset/:token', resetPassword);
router.patch('/password/update', requireLogIn, requirePassword, updatePassword);
router.patch('/update/name', requireLogIn, requirePassword, updateName);
router.patch('/update/email', requireLogIn, requirePassword, updateEmail);
router.delete('/delete', requireLogIn, requirePassword, deleteMe);

module.exports = router;
