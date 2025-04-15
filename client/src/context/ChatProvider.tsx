import React, { useState } from "react";
import ChatContext from "./ChatContext";
import { User } from "../types/user.types";

const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [allMessages, setAllMessages] = useState<{ [userId: string]: any[] }>(
    {}
  );

  return (
    <ChatContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        allMessages,
        setAllMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
