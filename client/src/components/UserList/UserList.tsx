import { useState, useEffect } from "react";
import { getUsers } from "../../services/api";
import UserItem from "./UserItem";
import { User } from "../../types/user.types";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken); // Set token from localStorage
    };

    fetchToken();
  }, []); // Runs only once on component mount

  useEffect(() => {
    const fetchUsers = async () => {
      if (token) {
        try {
          const users = await getUsers(token);
          setUsers(users);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchUsers();
  }, [token]); // Runs whenever token is updated

  return (
    <section className="bg-gradient-to-r from-indigo-600 to-indigo-400 w-full sm:w-64 ml-0 sm:ml-10 h-auto p-4 sm:p-6 rounded-b-xs rounded-t-md shadow-md translate-y-[-2] sm:translate-y-10">
      <p className="text-center text-xs sm:text-sm px-4 italic text-white opacity-80 mb-3">
        Select a chat...
      </p>

      {/* Map through users and render UserItem */}
      <div>
        {users.map(user => (
          <UserItem key={user._id} user={user} />
        ))}
      </div>
    </section>
  );
};

export default UserList;
