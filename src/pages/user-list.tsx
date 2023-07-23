import { useEffect, useState } from "react";
import Image from "next/image";

interface EmailAddress {
  id: string;
  emailAddress: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailAddresses: EmailAddress[];
  privateMetadata: {
    role?: string;
  };
}

enum SearchCriteria {
  FirstName = "firstName",
  LastName = "lastName",
  Email = "email",
  Role = "role",
  All = "all" // Default
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState(SearchCriteria.All);

  // Function to fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchCriteriaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchCriteria(event.target.value as SearchCriteria);
  };

  const isMatchingSearchQuery = (
    value: string | undefined,
    searchQueryLower: string
  ) => {
    if (!value) {
      return !searchQuery;
    }
    return value.toLowerCase().includes(searchQueryLower);
  };

  const filteredUsers = users.filter((user) => {
    const firstName = user.firstName ? user.firstName.toLowerCase() : "";
    const lastName = user.lastName ? user.lastName.toLowerCase() : "";
    const email = user.emailAddresses[0]?.emailAddress
      ? user.emailAddresses[0]?.emailAddress.toLowerCase()
      : "";
    const role = user.privateMetadata.role?.toLowerCase();
    const searchQueryLower = searchQuery.toLowerCase();

    switch (searchCriteria) {
      case SearchCriteria.FirstName:
        return isMatchingSearchQuery(firstName, searchQueryLower);
      case SearchCriteria.LastName:
        return isMatchingSearchQuery(lastName, searchQueryLower);
      case SearchCriteria.Email:
        return isMatchingSearchQuery(email, searchQueryLower);
      case SearchCriteria.Role:
        return isMatchingSearchQuery(role, searchQueryLower);
      default:
        return (
          isMatchingSearchQuery(firstName, searchQueryLower) ||
          isMatchingSearchQuery(lastName, searchQueryLower) ||
          isMatchingSearchQuery(email, searchQueryLower) ||
          isMatchingSearchQuery(role, searchQueryLower)
        );
    }
  });

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-2 flex items-center">
        <div className="mr-4 flex items-center">
          <Image
            src="/images/repair_lab_logo.jpg"
            alt="logo"
            width={80}
            height={80}
          />
        </div>
        <h1 className="ml-3 text-2xl font-semibold">User List</h1>
      </div>
      <div className="m-4 flex justify-end">
        <select
          value={searchCriteria}
          onChange={handleSearchCriteriaChange}
          className="rounded  border px-2 py-1"
        >
          <option value={SearchCriteria.All}>Search By</option>
          <option value={SearchCriteria.FirstName}>Search by First Name</option>
          <option value={SearchCriteria.LastName}>Search by Last Name</option>
          <option value={SearchCriteria.Email}>Search by Email</option>
          <option value={SearchCriteria.Role}>Search by Role</option>
        </select>
        <div className="ml-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="rounded-md border py-1 pl-3"
          />
        </div>
      </div>

      <div className="m-4 flex items-center">
        <div className="border-t-1 flex-1 border border-primary-600"></div>
      </div>
      <div className="mx-auto max-w-6xl overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="h-6 bg-lightAqua-300">
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-secondary-50"
                } h-8 border-b hover:bg-gray-100`}
              >
                <td> {user.firstName}</td>
                <td> {user.lastName}</td>
                <td> {user.emailAddresses[0]?.emailAddress}</td>
                <td> {user.privateMetadata.role || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPage;
