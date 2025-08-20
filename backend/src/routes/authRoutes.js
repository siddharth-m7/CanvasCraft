// routes/authRoutes.js
const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const {
  signupEmail,
  loginEmail,
  googleOAuth,
  googleOAuthCallback,
  signout,
  refreshToken,
  getLoggedInUser
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signupEmail);
router.post('/login', loginEmail);
// Optional alias to match current frontend usage:
router.post('/signin', loginEmail);

router.post('/google', googleOAuth);
router.get('/callback', googleOAuthCallback);

router.post('/signout', authenticateUser, signout);
router.post('/refresh', refreshToken);

router.get('/user', authenticateUser, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
