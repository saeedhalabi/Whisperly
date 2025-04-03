import UserItem from "./UserItem";
import { User } from "../../types/user.types";

const dummyUsers: User[] = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    lastSeen: "10m ago",
    isOnline: true,
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    lastSeen: "1h ago",
    isOnline: false,
  },
];

const UserList: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-500 to-black w-full sm:w-64 ml-0 sm:ml-10 h-auto p-4 sm:p-6 rounded-2xl shadow-md">
      <p className="text-center text-xs sm:text-sm px-4 italic text-white opacity-80 mb-3">
        Select a chat...
      </p>
      <div className="space-y-3">
        {dummyUsers.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
};

export default UserList;
