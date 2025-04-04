import { useContext } from "react";
import ChatContext from "../../context/ChatContext";

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
            {selectedUser?.firstName} {selectedUser?.lastName}
          </div>
        </header>

        {/* Chat Window */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {/* Sender's Message */}
          </div>
        </div>

        {/* Message Input */}
        <footer className="bg-indigo-600 p-4 flex items-center">
          <input
            type="text"
            className="flex-1 p-2 rounded-l-lg outline-none text-white"
            placeholder="Type your message..."
          />
          <button className="bg-white p-2 rounded-r-lg ml-2 cursor-pointer">
            <span className="text-indigo-600">Send</span>
          </button>
        </footer>
      </section>
    </main>
  );
};

export default ChatWindow;
