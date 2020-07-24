const express = require('express');
const { signup, login } = require('../controllers/authentication');
const { getUsers } = require('../controllers/user');

const router = express.Router();

router.post('/signup', signup);
router.get('/login', login);

router.route('/').get(getUsers);

module.exports = router;
