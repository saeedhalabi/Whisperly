import { User } from "../../types/user.types";
interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md cursor-pointer">
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
