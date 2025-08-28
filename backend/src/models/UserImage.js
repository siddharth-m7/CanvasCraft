const mongoose = require("mongoose");

const UserImageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to your User model
      required: true,
    },
    imageUrl: {
      type: String,
      required: true, // Cloudinary secure_url
    },
    publicId: {
      type: String,
      required: true, // Cloudinary public_id (helps for deleting/updating image)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserImage", UserImageSchema);
