const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/authentication');
const { getUsers } = require('../controllers/user');

const router = express.Router();

router.post('/signup', signup);
router.get('/login', login); // get a JWT
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.route('/').get(getUsers);

module.exports = router;
