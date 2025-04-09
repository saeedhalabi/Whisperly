export interface Message {
  isSender: boolean;
  text: string;
}

export interface MessagesProps {
  messages: Message[];
}
