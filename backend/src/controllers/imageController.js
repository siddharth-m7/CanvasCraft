const UserImage = require("../models/UserImage");
const cloudinary = require("../config/cloudinary");

const axios = require('axios');
const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, MODELS } = require('../config/cloudflare');

const generateImage = async (req, res) => {
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

    // Call Cloudflare Workers AI API
    const apiUrl = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${selectedModel}`;

    const response = await axios.post(apiUrl, payload, {
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer',
      timeout: 60000
    });

    console.log('✅ Cloudflare response received, status:', response.status);

    // Convert to base64
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    
    // Upload to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      {
        folder: "generated_images",
        public_id: `generated_${Date.now()}`,
        resource_type: "image"
      }
    );

    // Save to database using existing schema
    const newImage = await UserImage.create({
      user: req.user._id,
      imageUrl: cloudinaryResult.secure_url,
      publicId: cloudinaryResult.public_id,
    });

    console.log('✅ Image uploaded to Cloudinary and saved to database');

    res.json({ 
      success: true,
      image: `data:image/png;base64,${base64Image}`, // For immediate display
      cloudinaryUrl: cloudinaryResult.secure_url, // Permanent URL
      savedImage: newImage,
      metadata: {
        model: selectedModel,
        prompt,
        parameters: payload
      }
    });

    console.log('✅ Image generated and uploaded successfully');

  } catch (error) {
    console.error('❌ Error in image generation/upload:');
    console.error('Error Message:', error.message);
    
    // Handle Cloudflare API errors
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
      error: 'Failed to generate or upload image',
      details: error.response?.data || error.message,
      status: error.response?.status
    });
  }
};


// Get all images uploaded by the logged-in user
const getUserImages = async (req, res) => {
  try {
    const images = await UserImage.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, images });
  } catch (error) {
    console.error("Error fetching user images:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// DELETE an image by ID (only owner can delete)
const deleteUserImage = async (req, res) => {
  try {
    const userId = req.user.id; // comes from auth middleware
    const { imageId } = req.params;

    // Find the image
    const image = await UserImage.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    // console.log("Found image:", image);
    // Ensure this image belongs to the logged-in user
    if (image.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this image" });
    }
    // console.log("Deleting image with public_id:", image.publicId);
    // Delete from Cloudinary using public_id
    await cloudinary.uploader.destroy(image.publicId);

    // Remove from MongoDB
    await image.deleteOne();

    res.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete Image Error:", error);
    res.status(500).json({ message: "Server error deleting image" });
  }
};

module.exports = { getUserImages, deleteUserImage, generateImage};
