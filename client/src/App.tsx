import { useEffect, useContext } from "react";
import AppRouter from "./router/AppRouter";
import { socket } from "./utils/socket";
import ChatContext from "./context/ChatContext";

const App: React.FC = () => {
  const { setAllMessages } = useContext(ChatContext);

  useEffect(() => {
    // Don't connect here anymore — connection happens after sign-in

    const handleReceiveMessage = (message: any) => {
      setAllMessages(prev => {
        const prevMsgs = prev[message.senderId] || [];
        return {
          ...prev,
          [message.senderId]: [...prevMsgs, { ...message, isSender: false }],
        };
      });
    };

    socket.on("receiveMessage", handleReceiveMessage);

    socket.on("connect", () => {
      console.log("✅ Connected to server with socket ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
    });

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [setAllMessages]);

  return <AppRouter />;
};

export default App;
