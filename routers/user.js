const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require('../controllers/authentication');

const { updateName, updateEmail, deleteMe } = require('../controllers/user');

const router = express.Router();

router.post('/signup', signup);
router.get('/login', login); // get a JWT

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updatePassword', protect, updatePassword);
router.patch('/updateName', protect, updateName);
router.patch('/updateEmail', protect, updateEmail);
router.delete('/deleteMe', protect, deleteMe);

module.exports = router;
