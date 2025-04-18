import express from "express";
import {
  signUp,
  signIn,
  logout,
  getUsers,
  getCurrentUser,
} from "../controllers/authController.js";
const router = express.Router();

// Sign Up
router.post("/signup", signUp);

// Sign in
router.post("/signin", signIn);

// Logout
router.post("/logout", logout);

// Users
router.get("/users", getUsers);

// Current User
router.get("/me", getCurrentUser);

export default router;
