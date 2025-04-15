import { useContext, useEffect, useRef } from "react";
import ChatContext from "../../context/ChatContext";
import { socket } from "../../utils/socket";
import MessageInput from "./MessageInput";
import { getCurrentUser } from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";

const ChatWindow: React.FC = () => {
  const { selectedUser, allMessages, setAllMessages } = useContext(ChatContext);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const messages = selectedUser ? allMessages[selectedUser._id] || [] : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText || !selectedUser) return;

    try {
      const currentUser = await getCurrentUser();
      const newMessage = {
        text: messageText,
        senderId: currentUser._id,
        receiverId: selectedUser._id,
        isSender: true,
      };

      console.log("Sending message:", newMessage);

      // Update the state for the new message in the chat window
      setAllMessages(prev => {
        const prevMsgs = prev[selectedUser._id] || [];
        return {
          ...prev,
          [selectedUser._id]: [...prevMsgs, newMessage],
        };
      });

      // Emit the message once
      socket.emit("sendMessage", newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!selectedUser) return null;

  return (
    <main className="flex justify-center items-center mb-32 sm:absolute sm:top-32 sm:left-2/4 sm:w-96 w-full">
      <section className="bg-gradient-to-r from-indigo-700 to-indigo-500 sm:w-96 w-full h-[80vh] lg:rounded-lg sm:rounded-none shadow-lg flex flex-col">
        <header className="bg-indigo-500 p-4 text-white">
          <div className="text-lg font-bold">
            {selectedUser?.firstname} {selectedUser?.lastname}
          </div>
        </header>

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

        <MessageInput onSendMessage={handleSendMessage} />
      </section>
    </main>
  );
};

export default ChatWindow;
