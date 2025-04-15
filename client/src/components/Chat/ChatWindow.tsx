import { useContext, useEffect, useState, useRef } from "react";
import ChatContext from "../../context/ChatContext";
import { socket } from "../../utils/socket";
import MessageInput from "./MessageInput";
import { getCurrentUser } from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";

const ChatWindow: React.FC = () => {
  const { selectedUser } = useContext(ChatContext);
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          console.error("No current user found");
          return;
        }

        setMessages([]);

        socket.emit("registerUser", currentUser._id);
        console.log(
          `User ${currentUser._id} registered with socket ID: ${socket.id}`
        );

        socket.on("receiveMessage", (message: any) => {
          setMessages(prevMessages => [
            ...prevMessages,
            { ...message, isSender: false },
          ]);
        });

        socket.on("addMessage", (message: any) => {
          setMessages(prevMessages => [
            ...prevMessages,
            { ...message, isSender: true },
          ]);
        });
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    if (selectedUser) {
      fetchCurrentUser();
    }

    return () => {
      socket.off("receiveMessage");
      socket.off("addMessage");
    };
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText || !selectedUser) return;

    try {
      const currentUser = await getCurrentUser();

      setMessages(prevMessages => [
        ...prevMessages,
        {
          text: messageText,
          senderId: currentUser._id,
          receiverId: selectedUser._id,
          isSender: true,
        },
      ]);

      socket.emit("sendMessage", {
        text: messageText,
        senderId: currentUser._id,
        receiverId: selectedUser._id,
      });

      socket.emit("addMessage", {
        text: messageText,
        senderId: currentUser._id,
        receiverId: selectedUser._id,
        isSender: true,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!selectedUser) {
    return null;
  }

  return (
    <main className="flex justify-center items-center mb-32 sm:absolute sm:top-32 sm:left-2/4 sm:w-96 w-full">
      <section className="bg-gradient-to-r from-indigo-700 to-indigo-500 sm:w-96 w-full h-[80vh] lg:rounded-lg sm:rounded-none shadow-lg flex flex-col">
        {/* Header */}
        <header className="bg-indigo-500 p-4 text-white">
          <div className="text-lg font-bold">
            {selectedUser?.firstname} {selectedUser?.lastname}
          </div>
        </header>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-2 p-4">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.isSender ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.isSender
                      ? "bg-indigo-500 text-white drop-shadow-2xl"
                      : "bg-gray-100 text-gray-800 drop-shadow-2xl"
                  }`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <MessageInput onSendMessage={handleSendMessage} />
      </section>
    </main>
  );
};

export default ChatWindow;
