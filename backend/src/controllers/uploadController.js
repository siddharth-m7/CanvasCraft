const UserImage = require("../models/UserImage");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadUserImage = async (req, res) => {
  try {
    console.log("File received:", req.file);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_profiles",
    });
    
    console.log("Cloudinary upload result:", result);

    // remove temp file
    fs.unlinkSync(req.file.path);

    const newImage = await UserImage.create({
      user: req.user._id,        // comes from auth middleware
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });

    console.log("New image record created:", newImage);

    res.status(201).json({ success: true, image: newImage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const uploadImage = async (req, res) => {
  try {
    // console.log("File received:", req.file);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_uploads",
    });
    
    // console.log("Cloudinary upload result:", result);

    // remove temp file
    fs.unlinkSync(req.file.path);

    const newImage = await UserImage.create({
      user: req.user._id,        // comes from auth middleware
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });

    // console.log("New image record created:", newImage);

    res.status(201).json({ success: true, image: newImage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { uploadUserImage, uploadImage };