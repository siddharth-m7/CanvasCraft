const express = require('express');
const axios = require('axios');
const router = express.Router();

// Environment variables
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

// Check if environment variables are set
if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
  console.error('❌ Missing environment variables:');
  console.error('CLOUDFLARE_ACCOUNT_ID:', CLOUDFLARE_ACCOUNT_ID ? 'Set' : 'Missing');
  console.error('CLOUDFLARE_API_TOKEN:', CLOUDFLARE_API_TOKEN ? 'Set' : 'Missing');
}

// Available free models on Cloudflare
const MODELS = {
  'stable-diffusion': '@cf/stabilityai/stable-diffusion-xl-base-1.0',
  'dreamshaper': '@cf/lykon/dreamshaper-8-lcm',
  'flux-schnell': '@cf/black-forest-labs/flux-1-schnell'
};

// Express route for text-to-image generation
router.post('/', async (req, res) => {
  console.log('🎨 Image generation request received:', {
    prompt: req.body.prompt?.substring(0, 50) + '...',
    model: req.body.model
  });

  try {
    const { 
      prompt, 
      negative_prompt,
      model = 'stable-diffusion',
      num_steps = 20,
      guidance = 7.5,
      strength = 1,
      width = 1024,
      height = 1024
    } = req.body;

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

    // Select model
    const selectedModel = MODELS[model] || MODELS['stable-diffusion'];
    console.log('🤖 Using model:', selectedModel);

    // Prepare payload
    let payload = { prompt };
    
    if (negative_prompt) payload.negative_prompt = negative_prompt;
    if (selectedModel.includes('stable-diffusion')) {
      payload.num_steps = num_steps;
      payload.guidance = guidance;
      payload.strength = strength;
    }
    
    if (selectedModel.includes('flux')) {
      payload.width = width;
      payload.height = height;
    }

    console.log('📤 Sending request to Cloudflare with payload:', {
      model: selectedModel,
      prompt: prompt.substring(0, 50) + '...',
      params: Object.keys(payload)
    });

    // Call Cloudflare Workers AI API
    const apiUrl = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${selectedModel}`;
    console.log('🔗 API URL:', apiUrl);

    const response = await axios.post(apiUrl, payload, {
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer',
      timeout: 60000 // 60 second timeout
    });

    console.log('✅ Cloudflare response received, status:', response.status);

    // Convert to base64
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    
    res.json({ 
      success: true,
      image: `data:image/png;base64,${base64Image}`,
      metadata: {
        model: selectedModel,
        prompt,
        parameters: payload
      }
    });

    console.log('✅ Image generated successfully');

  } catch (error) {
    console.error('❌ Cloudflare AI Error:');
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('Response Data:', error.response?.data);
    console.error('Error Message:', error.message);
    
    // More specific error handling
    if (error.response?.status === 401) {
      return res.status(500).json({ 
        error: 'Authentication failed. Check your Cloudflare API token.',
        details: 'Invalid or expired API token'
      });
    }
    
    if (error.response?.status === 403) {
      return res.status(500).json({ 
        error: 'Access denied. Check your account permissions.',
        details: 'Account may not have access to Workers AI'
      });
    }
    
    if (error.response?.status === 404) {
      return res.status(500).json({ 
        error: 'Model not found or account ID incorrect.',
        details: 'Check your account ID and model availability'
      });
    }

    res.status(500).json({ 
      error: 'Failed to generate image',
      details: error.response?.data || error.message,
      status: error.response?.status
    });
  }
});

module.exports = router;
