import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ChatContext from "../../context/ChatContext";

interface MessageInputProps {
  onSendMessage: (messageText: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const { selectedUser } = useContext(ChatContext);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = async () => {
    if (!messageText || !selectedUser) return;
    onSendMessage(messageText);
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
