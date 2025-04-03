import ChatWindow from "../components/Chat/ChatWindow";
import UserList from "../components/UserList/UserList";
import Navbar from "../features/Navbar";
const Homepage = () => {
  return (
    <main className="relative home-page">
      <Navbar />
      <UserList />
      <ChatWindow />
    </main>
  );
};

export default Homepage;
