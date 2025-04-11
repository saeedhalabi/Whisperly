import { useState } from "react";
import { socket } from "../../utils/socket";
import { useContext } from "react";
import ChatContext from "../../context/ChatContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
        placeholder="Message"
        className="flex-1 p-2 rounded-lg bg-white text-gray-800 border border-gray-300 outline-none caret-indigo-600"
      />
      {/* Send Button */}
      <button
        onClick={handleSendMessage}
        className="px-4 py-2 bg-indigo-400 text-white rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none cursor-pointer"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};

export default MessageInput;
