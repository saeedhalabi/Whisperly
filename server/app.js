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

// Store the users and their socket IDs
const connectedUsers = {};

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

  socket.on("registerUser", userId => {
    connectedUsers[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID ${socket.id}`);
  });

  // Handle sendMessage event
  socket.on("sendMessage", message => {
    const { text, senderId, receiverId } = message;
    if (connectedUsers[receiverId]) {
      io.to(connectedUsers[receiverId]).emit("receiveMessage", {
        text,
        senderId,
        receiverId,
      });
      console.log(`Message sent to user ${receiverId}`);
    } else {
      console.log("Receiver not connected.");
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    for (const userId in connectedUsers) {
      if (connectedUsers[userId] === socket.id) {
        delete connectedUsers[userId];
        console.log(`User ${userId} disconnected`);
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
