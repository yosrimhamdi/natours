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

router.route('/signup').post(signup);
router.route('/login').get(login); // get a JWT

router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);
router.route('/updatePassword').patch(protect, updatePassword);

router.route('/').patch(updateMe);

module.exports = router;
