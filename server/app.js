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
    origin: "https://whisperly-frontend.onrender.com",
    credentials: true,
  },
  pingInterval: 25000,
  pingTimeout: 5000,
});

// Store the users and their socket IDs
const connectedUsers = {};

// Handle socket connections
io.on("connection", socket => {
  socket.on("registerUser", userId => {
    connectedUsers[userId] = socket.id;
  });

  // Handle sendMessage event
  socket.on("sendMessage", message => {
    const { text, senderId, receiverId } = message;
    if (connectedUsers[receiverId]) {
      // Emit to the receiver only
      io.to(connectedUsers[receiverId]).emit("receiveMessage", {
        text,
        senderId,
        receiverId,
      });

      // Optionally, you can emit an acknowledgment to the sender if needed
      io.to(socket.id).emit("messageSent", {
        text,
        senderId,
        receiverId,
      });
    } else {
      console.log("Receiver not connected.");
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    for (const userId in connectedUsers) {
      if (connectedUsers[userId] === socket.id) {
        delete connectedUsers[userId];
        break;
      }
    }
  });
});

// Start server
server.listen(port, () => {
  connectDB();
  console.log(`🚀 Server running on port ${port}`);
});
