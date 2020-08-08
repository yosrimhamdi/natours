const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authentication');

const { updateName, updateEmail, deleteMe, deleteUser } = require('../controllers/user');

const router = express.Router();

router.route('/:id').delete(deleteUser);

router.post('/signup', signup);
router.get('/login', login);

router.post('/password/forgot', forgotPassword);
router.patch('/password/reset/:token', resetPassword);
router.patch('/password/update', updatePassword);
router.patch('/update/name', updateName);
router.patch('/update/email', updateEmail);
router.delete('/delete', deleteMe);

module.exports = router;
