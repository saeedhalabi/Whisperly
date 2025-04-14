import { useContext, useEffect, useState } from "react";
import ChatContext from "../../context/ChatContext";
import { socket } from "../../utils/socket";
import MessageInput from "./MessageInput";
import { getCurrentUser } from "../../services/api";

const ChatWindow: React.FC = () => {
  const { selectedUser } = useContext(ChatContext);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          console.error("No current user found");
          return;
        }

        // Register socket listeners for incoming messages
        socket.on("receiveMessage", (message: any) => {
          setMessages(prevMessages => [
            ...prevMessages,
            { ...message, isSender: false }, // Received message (from other user)
          ]);
        });

        socket.on("addMessage", (message: any) => {
          setMessages(prevMessages => [
            ...prevMessages,
            { ...message, isSender: true }, // Sent message (from user)
          ]);
        });
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    if (selectedUser) {
      fetchCurrentUser();
    }

    // Clean up socket listeners on unmount
    return () => {
      socket.off("receiveMessage");
      socket.off("addMessage");
    };
  }, [selectedUser]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText || !selectedUser) return;

    try {
      const currentUser = await getCurrentUser();

      // Immediately add the sent message to the state
      setMessages(prevMessages => [
        ...prevMessages,
        {
          text: messageText,
          senderId: currentUser._id,
          receiverId: selectedUser._id,
          isSender: true,
        },
      ]);

      // Emit the message to the socket
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
      <section className="bg-gradient-to-r from-indigo-700 to-indigo-500 sm:w-96 w-full h-[80vh] rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <header className="bg-indigo-500 p-4 text-white">
          <div className="text-lg font-bold">
            {selectedUser?.firstname} {selectedUser?.lastname}
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex flex-col p-4 overflow-y-auto flex-grow space-y-4">
          {/* Render Messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isSender ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.isSender
                    ? "bg-indigo-500 text-white drop-shadow-2xl"
                    : "bg-gray-300 text-black drop-shadow-2xl"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <MessageInput onSendMessage={handleSendMessage} />
      </section>
    </main>
  );
};

export default ChatWindow;
