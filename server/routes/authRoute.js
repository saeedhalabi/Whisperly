import express from "express";
import { signUp, signIn, logout } from "../controllers/authController.js";
const router = express.Router();

// Sign Up
router.post("/signup", signUp);

// Sign in
router.post("/signin", signIn);

// Logout
router.post("/logout", logout);

export default router;
