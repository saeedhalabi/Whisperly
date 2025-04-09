import { useState } from "react";
import { socket } from "../../utils/socket";
import { useContext } from "react";
import ChatContext from "../../context/ChatContext";

const MessageInput: React.FC = () => {
  const { selectedUser } = useContext(ChatContext);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (!messageText || !selectedUser) return;

    socket.emit("sendMessage", {
      text: messageText,
      senderId: selectedUser._id,
      receiverId: selectedUser._id,
    });

    setMessageText("");
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-indigo-700 rounded-b-lg">
      {/* Message Input */}
      <input
        type="text"
        value={messageText}
        onChange={e => setMessageText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-3 rounded-lg bg-white text-black border border-gray-300 outline-none"
      />
      {/* Send Button */}
      <button
        onClick={handleSendMessage}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none cursor-pointer"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
