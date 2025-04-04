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
      className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md cursor-pointer"
      onClick={() => setSelectedUser(user)}
    >
      {/* User Name & Last Seen */}
      <div>
        <p className="font-medium text-black">
          {user.firstName} {user.lastName}
        </p>
      </div>
    </div>
  );
};

export default UserItem;
