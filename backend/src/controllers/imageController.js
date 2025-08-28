const UserImage = require("../models/UserImage");
const cloudinary = require("../config/cloudinary");

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

module.exports = { getUserImages, deleteUserImage };
