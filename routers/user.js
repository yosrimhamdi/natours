const express = require('express');
const { signup, login, forgotPassword } = require('../controllers/authentication');
const { getUsers } = require('../controllers/user');

const router = express.Router();

router.post('/signup', signup);
router.get('/login', login);
router.post('/forgotPassword', forgotPassword);

router.route('/').get(getUsers);

module.exports = router;
