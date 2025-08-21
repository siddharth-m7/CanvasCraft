// routes/authRoutes.js
const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const {
  signupEmail,
  loginEmail,
  signout,
  refreshToken,
  getLoggedInUser
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signupEmail);
router.post('/login', loginEmail);
router.post('/signin', loginEmail);

router.post('/signout', authenticateUser, signout);


module.exports = router;
