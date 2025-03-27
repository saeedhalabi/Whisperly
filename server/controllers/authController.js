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
      return res.status(400).json({ message: "User already exists" });
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

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Sign Up Error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// sign in function
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Add the pepper to the password during sign-in as well
    const pepper = process.env.PEPPER;
    const pepperedPassword = password + pepper;

    // compare password
    const isMatch = await bcrypt.compare(pepperedPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set JWT in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
