import { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import { socket } from "./utils/socket";

const App: React.FC = () => {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected to server with socket ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <AppRouter />;
};

export default App;
