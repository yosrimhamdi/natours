const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require('../controllers/authentication');

const { updateMe } = require('../controllers/user');

const router = express.Router();

router.post('/signup', signup);
router.get('/login', login); // get a JWT

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updatePassword', protect, updatePassword);
router.patch('/updateMe', updateMe);

module.exports = router;
