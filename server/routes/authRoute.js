import express from "express";
import { signUp, signIn } from "../controllers/authController.js";
const router = express.Router();

// Sign Up
router.post("/signup", signUp);

// Sign in
router.post("/signin", signIn);

export default router;
