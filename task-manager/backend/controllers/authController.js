const crypto = require("crypto");
const User = require("../models/User");

let bcrypt;
try {
  bcrypt = require("bcryptjs");
} catch (e) {
  bcrypt = null;
}

let jwt;
try {
  jwt = require("jsonwebtoken");
} catch (e) {
  jwt = null;
}

const JWT_SECRET = process.env.JWT_SECRET || "taskflow_super_secret_jwt_key_2026";

// Hash password helper (bcryptjs with crypto fallback)
const hashPassword = async (password) => {
  if (bcrypt) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  return crypto.pbkdf2Sync(password, "taskflow_salt", 1000, 64, "sha512").toString("hex");
};

// Compare password helper
const comparePassword = async (enteredPassword, storedHash) => {
  if (bcrypt && storedHash.startsWith("$2")) {
    return await bcrypt.compare(enteredPassword, storedHash);
  }
  const hash = crypto.pbkdf2Sync(enteredPassword, "taskflow_salt", 1000, 64, "sha512").toString("hex");
  return hash === storedHash;
};

// Generate JWT token helper
const generateToken = (id) => {
  if (jwt) {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: "30d" });
  }
  return Buffer.from(JSON.stringify({ id, exp: Date.now() + 30 * 24 * 60 * 60 * 1000 })).toString("base64");
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields (name, email, password)" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: "An account with this email already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    if (user) {
      const token = generateToken(user._id);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// @desc    Authenticate a user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
