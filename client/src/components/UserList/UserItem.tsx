import { User } from "../../types/user.types";
import { useContext } from "react";
import ChatContext from "../../context/ChatContext";
interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const { setSelectedUser } = useContext(ChatContext);

  return (
    <div
      className="flex items-center justify-between p-3 bg-white/30 backdrop-blur-sm rounded-lg shadow-md cursor-pointer my-3 transition-all ease-in-out duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={() => setSelectedUser(user)}
      tabIndex={0} // Ensure the div is focusable
    >
      <div>
        <p className="font-medium text-white">
          {user.firstname} {user.lastname}
        </p>
      </div>
    </div>
  );
};

export default UserItem;
