const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require('../controllers/authentication');

const router = express.Router();

router.post('/signup', signup);
router.get('/login', login); // get a JWT
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.route('/:token').patch(protect, updatePassword);

module.exports = router;
