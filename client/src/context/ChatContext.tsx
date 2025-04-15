import { createContext } from "react";
import { User } from "../types/user.types";

type Message = {
  text: string;
  senderId: string;
  receiverId: string;
  isSender: boolean;
};

type ChatContextType = {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  allMessages: { [userId: string]: Message[] };
  setAllMessages: React.Dispatch<
    React.SetStateAction<{ [userId: string]: Message[] }>
  >;
};

const ChatContext = createContext<ChatContextType>({
  selectedUser: null,
  setSelectedUser: () => {},
  allMessages: {},
  setAllMessages: () => {},
});

export default ChatContext;
