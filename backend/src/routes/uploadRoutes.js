
const express = require("express");
const fs = require("fs");
const cloudinary = require("../config/cloudinary.js");
const upload = require("../middleware/upload.js");
const authMiddleware = require("../middleware/auth");
const { uploadUserImage,uploadImage } = require("../controllers/uploadController.js");


const router = express.Router();

//single image
router.post("/", upload.single("image"), authMiddleware, uploadImage);


module.exports = router;
