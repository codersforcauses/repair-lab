import { useState } from "react";
import Image from "next/image";

import useUsers from "../hooks/useUsers";
import { SearchCriteria } from "../types";

const UserPage = () => {
  const { users, error } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState(SearchCriteria.All);

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

  const isMatchingSearchQuery = (value: string, searchQueryLower: string) => {
    return value.toLowerCase().includes(searchQueryLower);
  };

  const filteredUsers = users.filter((user) => {
    const searchQueryLower = searchQuery.toLowerCase();

    switch (searchCriteria) {
      case SearchCriteria.FirstName:
        return isMatchingSearchQuery(user.firstName, searchQueryLower);
      case SearchCriteria.LastName:
        return isMatchingSearchQuery(user.lastName, searchQueryLower);
      case SearchCriteria.Email:
        return isMatchingSearchQuery(
          user.emailAddresses[0]?.emailAddress || "",
          searchQueryLower
        );
      case SearchCriteria.Role:
        return isMatchingSearchQuery(
          user.privateMetadata.role || "",
          searchQueryLower
        );
      default:
        return (
          isMatchingSearchQuery(user.firstName, searchQueryLower) ||
          isMatchingSearchQuery(user.lastName, searchQueryLower) ||
          isMatchingSearchQuery(
            user.emailAddresses[0]?.emailAddress || "",
            searchQueryLower
          ) ||
          isMatchingSearchQuery(
            user.privateMetadata.role || "",
            searchQueryLower
          )
        );
    }
  });

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div>Error: {error}</div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center">
        <div className="mr-4">
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
          className="rounded border px-2 py-1"
        >
          <option value={SearchCriteria.All}>Search by</option>
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

      <div className="m-4">
        <div className="border border-primary-600"></div>
      </div>
      <div className="mx-auto max-w-6xl">
        <table className="w-full">
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
                <td> {user.privateMetadata.role || "N/A"}</td>
              </tr>
            ))}
          </tbody>
          {filteredUsers.length === 0 && (
            <div className="text-center py-4">No users found.</div>
          )}
        </table>
      </div>
    </div>
  );
};

export default UserPage;
