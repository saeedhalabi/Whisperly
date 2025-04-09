import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import corsMiddleware from "./middleware/cors.js";
import logger from "./middleware/logger.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";

const port = process.env.PORT;
const app = express();

// Middleware
app.use(corsMiddleware);
app.use(logger);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoute);

// Create HTTP server
const server = http.createServer(app);

// Create socket server with CORS support
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Handle socket connections
io.on("connection", socket => {
  console.log("✅ a user connected:", socket.id);

  socket.on("sendMessage", message => {
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("❌ user disconnected:", socket.id);
  });
});

// Start server
server.listen(port, () => {
  connectDB();
  console.log(`🚀 Server running on port ${port}`);
});
