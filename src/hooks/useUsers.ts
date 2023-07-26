import { useEffect, useState } from "react";

import { User } from "../types";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        if (error instanceof Error) {
          setError("Error fetching users: " + error.message);
        } else {
          setError("An error occurred while fetching users.");
        }
      }
    };
    fetchUsers();
  }, []);

  return { users, error };
};

export default useUsers;
