import Auth from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// sign up function
export const signUp = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // check if the user already exists
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message:
          "An account with this email already exists. Please log in instead",
      });
    }

    // Add a secret pepper to the password for added security before hashing.
    const pepper = process.env.PEPPER;

    const pepperedPassword = password + pepper;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pepperedPassword, salt);

    // Create a new user
    const newUser = new Auth({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    // save user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "Your account has been created successfully" });
  } catch (error) {
    console.error("Sign Up Error", error);
    res.status(500).json({
      message:
        "Something went wrong during registration. Please try again later",
    });
  }
};

// sign in function
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await Auth.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again" });
    }

    // Add the pepper to the password during sign-in as well
    const pepper = process.env.PEPPER;
    const pepperedPassword = password + pepper;

    // compare password
    const isMatch = await bcrypt.compare(pepperedPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again" });
    }

    // generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set JWT in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "You have signed in successfully", token });
  } catch (error) {
    res.status(500).json({
      message:
        "An unexpected error occurred during sign-in. Please try again later",
    });
    k;
  }
};

// logout function
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.status(200).json({ message: "You have been logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({
      message: "An error occurred while logging out. Please try again",
    });
  }
};

// get users
export const getUsers = async (req, res) => {
  try {
    // Extract the token from the cookie
    const token = req.cookies.token;

    // If no token exists, return unauthorized
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get the authenticated user's ID
    const currentUserId = decoded.userId;

    // Fetch all users excluding the current user
    const users = await Auth.find(
      { _id: { $ne: currentUserId } },
      "id firstname lastname"
    );

    if (!users || users.length === 0) {
      return res.status(400).json({ message: "No users found" });
    } else {
      return res
        .status(200)
        .json({ message: "Users fetched successfully", users });
    }
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({
      message:
        "Something went wrong while retrieving users. Please try again later",
    });
  }
};

// Get current user info from token
export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Auth.findById(decoded.userId).select(
      "id firstname lastname email"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("Get Current User Error:", err);
    res.status(500).json({ message: "Failed to fetch current user" });
  }
};
