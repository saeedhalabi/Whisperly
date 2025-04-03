import { User } from "../../types/user.types";
interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const isUserOnline = user.isOnline === true || user.isOnline === "online";
  const statusText = isUserOnline ? "Online" : "Offline";

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md cursor-pointer">
      {/* User Name & Last Seen */}
      <div>
        <p className="font-medium text-black">
          {user.firstName} {user.lastName}
        </p>
        {user.lastSeen && (
          <p className="text-xs text-gray-500">Last seen: {user.lastSeen}</p>
        )}
      </div>

      {/* Status Indicator */}
      <div className="flex items-center gap-2">
        <span
          className={`w-3 h-3 rounded-full ${
            isUserOnline ? "bg-green-600 animate-pulse" : "bg-gray-400"
          }`}
        />
        <p
          className={`text-xs ${
            isUserOnline ? "text-green-500" : "text-gray-500"
          }`}
        >
          {statusText}
        </p>
      </div>
    </div>
  );
};

export default UserItem;
