import { useContext } from "react";
import ChatContext from "../../context/ChatContext";
import MessageInput from "./MessageInput";
const ChatWindow: React.FC = () => {
  const { selectedUser } = useContext(ChatContext);

  if (!selectedUser) {
    return null;
  }

  return (
    <main className="flex justify-center items-center mb-32 sm:absolute sm:top-32 sm:left-2/4 sm:w-96 w-full">
      <section className="bg-gradient-to-r from-indigo-500 to-indigo-700 sm:w-96 w-full h-[80vh] rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <header className="bg-indigo-600 p-4 text-white">
          <div className="text-lg font-bold">
            {selectedUser?.firstname} {selectedUser?.lastname}
          </div>
        </header>

        {/* Chat Window */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {/* Sender's Message */}
          </div>
        </div>
        {/* Message input */}
        <MessageInput />
      </section>
    </main>
  );
};

export default ChatWindow;
