import { ChangeEvent, useState } from "react";

import useUsers from "@/hooks/users";
import { User } from "@/types";

const User = () => {
  const [orderBy, setOrderBy] = useState("-created_at");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { data: users, isLoading } = useUsers(perPage, page, orderBy, query);

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    // will need to setPage back to 1 otherwise it will be looking at the last page
    setPage(1);
    setQuery(e.target.value);
  };

  return (
    <div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-4 w-4 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="default-search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Search Mockups, Logos..."
          required
          value={query}
          onChange={(e) => search(e)}
        />
      </div>
      {isLoading ? (
        <div className="w-">
          <svg
            aria-hidden="true"
            className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 "
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <div className="relative overflow-x-auto p-10 shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 ">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    First Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Last Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.items.map((user: User, index: number) => {
                  return (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-secondary-50"
                      } h-8 border-b hover:bg-gray-100`}
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
                      >
                        {user.firstName}
                      </th>
                      <td className="px-6 py-4">{user.lastName}</td>
                      <td className="px-6 py-4">{user.emailAddress}</td>
                      <td className="px-6 py-4">{user.role as string}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-2 flex flex-row justify-between">
              <div className="flex flex-row items-center gap-1 text-sm text-gray-700">
                Showing
                <span className="font-semibold text-gray-900">
                  {Number(users.meta.perPage) * Number(users.meta.page) -
                    Number(users.meta.perPage) ==
                  0
                    ? 1
                    : Number(users.meta.perPage) * Number(users.meta.page) -
                      Number(users.meta.perPage)}
                </span>
                <span>to</span>
                <span className="font-semibold text-gray-900">
                  {Number(users.meta.perPage) * Number(users.meta.page)}
                </span>
                of
                <span className="font-semibold text-gray-900">
                  {users.meta.totalCount}
                </span>
                Entries
              </div>

              <div className="inline-flex ">
                <button
                  className="flex h-8 items-center justify-center rounded-l bg-primary-400 px-3 text-sm font-medium text-white hover:bg-gray-900"
                  onClick={() =>
                    setPage(Number(page) - 1 == 0 ? 1 : Number(page) - 1)
                  }
                >
                  Prev
                </button>
                <button
                  className="flex h-8 items-center justify-center rounded-r border-0 border-l border-white bg-primary-400 px-3 text-sm font-medium text-white hover:bg-gray-900 "
                  onClick={() =>
                    setPage(
                      Number(page) + 1 > Number(users.meta.lastPage)
                        ? Number(users.meta.lastPage)
                        : Number(page) + 1
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
