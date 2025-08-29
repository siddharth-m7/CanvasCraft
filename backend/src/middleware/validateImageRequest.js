const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN } = require('../config/cloudflare');

const validateImageRequest = (req, res, next) => {
  const { prompt } = req.body;

  // Validate required fields
  if (!prompt) {
    console.log('❌ No prompt provided');
    return res.status(400).json({ 
      error: 'Prompt is required.' 
    });
  }

  // Check environment variables
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    console.log('❌ Missing Cloudflare credentials');
    return res.status(500).json({ 
      error: 'Server configuration error: Missing Cloudflare credentials' 
    });
  }

  next();
};

module.exports = {
  validateImageRequest
};
