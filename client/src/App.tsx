import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import AppRouter from "./router/AppRouter";
import { socket } from "./utils/socket";
import { getCurrentUser } from "./services/api";
import ChatContext from "./context/ChatContext";

const App: React.FC = () => {
  const { setAllMessages } = useContext(ChatContext);
  const socketInitialized = useRef(false);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    if (socketInitialized.current) return;
    socketInitialized.current = true;

    // Connect to the socket
    socket.connect();

    const setupSocket = async () => {
      try {
        // Get the current user, if no user, navigate to the 401 page
        const currentUser = await getCurrentUser();
        socket.emit("registerUser", currentUser._id);

        socket.on("receiveMessage", async (message: any) => {
          const currentUser = await getCurrentUser();

          if (message.senderId === currentUser._id) {
            return; // Ignore messages sent by the current user
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

        // Redirect to the 401 page
        navigate("/unauthorized"); // Redirects to the unauthorized page
      }
    };

    setupSocket();

    socket.on("connect", () => {
      console.log("✅ Connected to server with socket ID:", socket.id);
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
  }, [setAllMessages, navigate]);

  return <AppRouter />;
};

export default App;
