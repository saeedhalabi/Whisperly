import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import authRoute from "./routes/authRoute.js";
const port = process.env.PORT || 4000;
const app = express();

// body parser (JSON-encoded bodies)
app.use(bodyParser.json());

// body parser (URL-encoded bodies)
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoute);

// listen for a port
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
