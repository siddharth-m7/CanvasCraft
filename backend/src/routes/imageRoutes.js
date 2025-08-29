const express = require("express");
const authMiddleware = require("../middleware/auth");
const { getUserImages, deleteUserImage } = require("../controllers/imageController");

const router = express.Router();

// Protected route: only logged-in users can see their images
router.get("/my-images", authMiddleware, getUserImages);

router.delete("/:imageId", authMiddleware, deleteUserImage);

module.exports = router;
