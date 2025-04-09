import React from "react";
import { Message, MessagesProps } from "../../types/message.types"; // Adjust the path as needed

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.isSender ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`p-3 rounded-lg max-w-[70%] ${
              message.isSender
                ? "bg-indigo-400 text-white shadow-md rounded-br-none"
                : "bg-gray-100 text-black shadow-md rounded-bl-none"
            }`}
          >
            <p className="text-sm">{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
