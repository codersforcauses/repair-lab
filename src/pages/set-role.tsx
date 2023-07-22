import { useEffect, useState } from "react";

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
    <div>
      <h1>Users</h1>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <select value={searchCriteria} onChange={handleSearchCriteriaChange}>
          <option value={SearchCriteria.All}>Search All</option>
          <option value={SearchCriteria.FirstName}>Search by First Name</option>
          <option value={SearchCriteria.LastName}>Search by Last Name</option>
          <option value={SearchCriteria.Email}>Search by Email</option>
          <option value={SearchCriteria.Role}>Search by Role</option>
        </select>
      </div>
      {filteredUsers.map((user) => (
        <div key={user.id}>
          <h2>User Details</h2>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.emailAddresses[0]?.emailAddress}</p>
          <p>Role: {user.privateMetadata.role || "-"}</p>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
