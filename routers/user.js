const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  itIsHim,
} = require('../controllers/authentication');

const { updateName, updateEmail, deleteMe } = require('../controllers/user');

const router = express.Router();

router.post('/signup', signup);
router.get('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updatePassword', protect, itIsHim, updatePassword);
router.patch('/updateName', protect, itIsHim, updateName);
router.patch('/updateEmail', protect, itIsHim, updateEmail);
router.delete('/deleteMe', protect, itIsHim, deleteMe);

module.exports = router;
