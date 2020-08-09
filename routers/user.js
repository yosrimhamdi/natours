const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authentication');

const {
  getUser,
  getUsers,
  updateName,
  updateEmail,
  deleteMe,
  deleteUser,
  setParamsId,
} = require('../controllers/user');

const { requireLogIn } = require('../controllers/authentication');

const router = express.Router();

router.route('/').get(getUsers);

router.get('/me', requireLogIn, setParamsId, getUser);

router.route('/:id').get(getUser).delete(deleteUser);

router.post('/signup', signup);
router.get('/login', login);

router.post('/password/forgot', forgotPassword);
router.patch('/password/reset/:token', resetPassword);
router.patch('/password/update', updatePassword);
router.patch('/update/name', updateName);
router.patch('/update/email', updateEmail);
router.delete('/delete', deleteMe);

module.exports = router;
