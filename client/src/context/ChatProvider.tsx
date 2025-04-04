import { ReactNode, useState } from "react";
import ChatContext from "./ChatContext";
import { User } from "../types/user.types";
// Define the type for the children prop
type ChatProviderProps = {
  children: ReactNode;
};

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <ChatContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
