import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path"; // Import path module for handling file paths
import { fileURLToPath } from "url"; // Import fileURLToPath from 'url'
dotenv.config();
import { connectDB } from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import corsMiddleware from "./middleware/cors.js";
import logger from "./middleware/logger.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";

// Convert import.meta.url to __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve static assets in production (React's build folder)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build"))); // Serve static files from React build

  // Catch-all route to serve index.html for frontend routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Create HTTP server
const server = http.createServer(app);

// Create socket server with CORS support
const io = new Server(server, {
  cors: {
    origin: "https://whisperly-frontend.onrender.com",
    credentials: true,
  },
});

// Store the users and their socket IDs
const connectedUsers = {};

// Handle socket connections
io.on("connection", socket => {
  console.log("✅ a user connected:", socket.id);

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
