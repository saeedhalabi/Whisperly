import express from "express";
import {
  signUp,
  signIn,
  logout,
  getUsers,
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

export default router;
