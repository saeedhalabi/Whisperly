import { ReactNode } from "react";
import ChatContext from "./ChatContext";

// Define the type for the children prop
type ChatProviderProps = {
  children: ReactNode;
};

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  return <ChatContext.Provider value={null}>{children}</ChatContext.Provider>;
};


export default ChatProvider