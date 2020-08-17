const express = require('express');

const {
  getOverview,
  getTour,
  getLoginForm,
  getUserAccount,
} = require('../controllers/view');
const { isLoggedIn, requireLogIn } = require('../controllers/authentication');

const router = express.Router();

router.use(isLoggedIn);

router.get('/', getOverview);

router.get('/me', requireLogIn, getUserAccount);

router.get('/tour/:slug', getTour);

router.get('/auth/login', getLoginForm);

module.exports = router;
