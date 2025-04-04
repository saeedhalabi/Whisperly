import { createContext } from "react";
import { User } from "../types/user.types";

type ChatContextType = {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
};

const ChatContext = createContext<ChatContextType>({
  selectedUser: null,
  setSelectedUser: () => {},
});

export default ChatContext;
