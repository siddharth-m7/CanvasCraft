const express = require('express');
const router = express.Router();
const { generateImage } = require('../controllers/imageController');
const { validateImageRequest } = require('../middleware/validateImageRequest');
const authMiddleware = require('../middleware/auth');

// Express route for text-to-image generation
router.post('/',authMiddleware, validateImageRequest, generateImage);

module.exports = router;
