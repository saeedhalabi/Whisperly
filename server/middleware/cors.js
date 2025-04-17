import cors from "cors";

const corsMiddleware = cors({
  origin: "https://whisperly-frontend.onrender.com",
  credentials: true,
});

export default corsMiddleware;
