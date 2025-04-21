import Auth from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Helper: Generate browser fingerprint
const getBrowserHash = req => {
  const userAgent = req.headers["user-agent"] || "";
  return crypto.createHash("sha256").update(userAgent).digest("hex");
};

// Sign up
export const signUp = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Account already exists. Please log in.",
      });
    }

    const pepper = process.env.PEPPER;
    const pepperedPassword = password + pepper;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pepperedPassword, salt);

    const newUser = new Auth({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Sign Up Error", error);
    res.status(500).json({ message: "Registration failed. Try again later." });
  }
};

// Sign in (FIXED)
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const pepper = process.env.PEPPER;
    const pepperedPassword = password + pepper;
    const isMatch = await bcrypt.compare(pepperedPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token with browser fingerprint
    const token = jwt.sign(
      {
        userId: user._id,
        browser: getBrowserHash(req), // Unique to browser
        loginTime: Date.now(), // Forces token rotation
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Secure cookie settings
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Prevents cross-browser sharing
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Signed in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Sign-in failed. Try again later." });
  }
};

// Middleware: Validate browser match (ADD THIS)
export const validateSession = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentBrowserHash = getBrowserHash(req);

    if (decoded.browser !== currentBrowserHash) {
      res.clearCookie("token");
      return res.status(401).json({ message: "Session expired" });
    }

    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.status(401).json({ message: "Invalid token" });
  }
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await Auth.findById(req.userId).select(
      "id firstname lastname email"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// Get users (PROTECTED)
export const getUsers = async (req, res) => {
  try {
    const users = await Auth.find(
      { _id: { $ne: req.userId } },
      "id firstname lastname"
    );
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
