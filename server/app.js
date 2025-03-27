import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import corsMiddleware from "./middleware/cors.js";
import logger from "./middleware/logger.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 4000;
const app = express();

// CORS middleware
app.use(corsMiddleware);

// logger middleware
app.use(logger);

// body parser (JSON-encoded bodies)
app.use(bodyParser.json());

// Middleware to handle cookies
app.use(cookieParser());

// body parser (URL-encoded bodies)
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoute);

// listen for a port
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
