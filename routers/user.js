const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  requireLogIn,
  requirePassword,
} = require('../controllers/authentication');

const { updateName, updateEmail, deleteMe } = require('../controllers/user');

const router = express.Router();

router.post('/signup', signup);
router.get('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updatePassword', requireLogIn, requirePassword, updatePassword);
router.patch('/updateName', requireLogIn, requirePassword, updateName);
router.patch('/updateEmail', requireLogIn, requirePassword, updateEmail);
router.delete('/deleteMe', requireLogIn, requirePassword, deleteMe);

module.exports = router;
