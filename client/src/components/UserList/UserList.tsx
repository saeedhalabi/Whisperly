import UserItem from "./UserItem";
import { User } from "../../types/user.types";

const dummyUsers: User[] = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
  },
  {
    id: 3,
    firstName: "Charlie",
    lastName: "Brown",
  },
  {
    id: 4,
    firstName: "David",
    lastName: "Wilson",
  },
  {
    id: 5,
    firstName: "Emma",
    lastName: "Davis",
  },
  {
    id: 6,
    firstName: "Frank",
    lastName: "Miller",
  },
  {
    id: 7,
    firstName: "Grace",
    lastName: "Taylor",
  },
  {
    id: 8,
    firstName: "Henry",
    lastName: "Moore",
  },
];

const UserList: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-500 to-black w-full sm:w-64 ml-0 sm:ml-10 h-auto p-4 sm:p-6 rounded-b-xs rounded-t-md shadow-md translate-y-[-2] sm:translate-y-10">
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
