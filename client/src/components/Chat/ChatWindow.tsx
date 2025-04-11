import { useContext, useEffect, useState } from "react";
import ChatContext from "../../context/ChatContext";
import { socket } from "../../utils/socket";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const ChatWindow: React.FC = () => {
  const { selectedUser } = useContext(ChatContext);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!selectedUser) return;

    socket.on("receiveMessage", (message: any) => {
      const isSender = message.senderId === selectedUser._id;

      setMessages(prevMessages => [...prevMessages, { ...message, isSender }]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedUser]);

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

        <div className="flex-1 p-4 overflow-y-auto">
          <Messages messages={messages} />
        </div>

        <MessageInput />
      </section>
    </main>
  );
};

export default ChatWindow;
