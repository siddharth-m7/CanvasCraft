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
// Optional alias to match current frontend usage:
router.post('/signin', loginEmail);



router.post('/signout', authenticateUser, signout);
router.post('/refresh', authenticateUser, refreshToken);

router.get('/user', getLoggedInUser);
router.get('/me', getLoggedInUser);

module.exports = router;
