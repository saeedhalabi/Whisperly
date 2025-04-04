const MessageInput: React.FC = () => {
  return (
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
  );
};

export default MessageInput;
