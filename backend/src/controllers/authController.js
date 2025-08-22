
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/bcrypt.js");

// SIGNUP
const signUpController = async (req, res) => {
  try {
    const { email, password, username, profilePicture } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      username: username.toLowerCase(),
      profilePicture: profilePicture || undefined,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "3d" });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const { password: _, ...safeUser } = newUser._doc;
    return res.status(201).json({ message: "User created successfully", user: safeUser });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const { password: _, ...safeUser } = user._doc;
    return res.status(200).json({ message: "Login successful", user: safeUser });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// LOGOUT
const logoutController = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logout successful" });
};

// GET CURRENT USER
const CurrentUserController = async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    const user = await User.findById(decoded.id).select("-password");
    return res.json({ message: "Access granted", user });
  });
};

module.exports = { signUpController, loginController, logoutController, CurrentUserController };
