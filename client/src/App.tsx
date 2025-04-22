import { useEffect, useContext, useState } from "react";
import AppRouter from "./router/AppRouter";
import { socket } from "./utils/socket";
import { getCurrentUser } from "./services/api";
import ChatContext from "./context/ChatContext";

const App: React.FC = () => {
  const { setAllMessages } = useContext(ChatContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    socket.connect();

    const setupSocket = async () => {
      try {
        const currentUser = await getCurrentUser();
        socket.emit("registerUser", currentUser._id);

        socket.on("receiveMessage", async (message: any) => {
          const currentUser = await getCurrentUser();

          if (message.senderId === currentUser._id) {
            return;
          }

          setAllMessages(prev => {
            const prevMsgs = prev[message.senderId] || [];
            return {
              ...prev,
              [message.senderId]: [
                ...prevMsgs,
                { ...message, isSender: false },
              ],
            };
          });
        });
      } catch (error) {
        console.error("Error setting up socket:", error);
      }
    };

    setupSocket();

    socket.on("connect", () => {
      console.log("✅ Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
    });

    // Cleanup socket on unmount
    return () => {
      socket.off("receiveMessage");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [isAuthenticated, setAllMessages]);

  return <AppRouter />;
};

export default App;
