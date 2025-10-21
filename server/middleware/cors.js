import cors from "cors";

const corsMiddleware = cors({
  origin: ["http://localhost:5173", "https://whisperly-frontend.onrender.com"],
  credentials: true,
});

export default corsMiddleware;
