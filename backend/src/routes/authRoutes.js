const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { signUpController,loginController,logoutController,CurrentUserController } = require('../controllers/authController');

const router = express.Router();

// SignUp route
router.post('/signup', signUpController);

// login route
router.post('/login', loginController);

router.post('/logout', logoutController);

router.get('/me', CurrentUserController);

module.exports = router;