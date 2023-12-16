import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa";

import Button from "@/components/Button";
import TablePagination from "@/components/Table/table-pagination";
import LoadingSpinner from "@/components/UI/loading-spinner";
import { useUsers } from "@/hooks/users";
import { manageVolunteerSchema } from "@/schema/manage-volunteer";
import type { VolunteerManageAttempt } from "@/types";
import { User } from "@/types";

export default function VolunteerManageForm({
  volunteersArray,
  onSubmit
}: {
  volunteersArray?: string[];
  onSubmit?: SubmitHandler<VolunteerManageAttempt>;
}) {
  const [orderBy, _setOrderBy] = useState("-created_at");
  const [perPage, _setPerPage] = useState(8);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { data: users, isLoading } = useUsers(perPage, page, orderBy, query);

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    // will need to setPage back to 1 otherwise it will be looking at the last page
    setPage(1);
    setQuery(e.target.value);
  };
  const { control, handleSubmit } = useForm<VolunteerManageAttempt>({
    resolver: zodResolver(manageVolunteerSchema),
    defaultValues: {
      volunteers: []
    }
  });

  const defaultOnSubmit: SubmitHandler<VolunteerManageAttempt> = async (
    data
  ) => {
    console.log(JSON.stringify(data));
    // const response = await fetch("/api/event", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // });
    // if (response.ok) {
    //   alert("Data submitted");
    // } else {
    //   alert(`Error! ${response.statusText}`)
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit ? onSubmit : defaultOnSubmit)}>
      <div className="m-1 flex flex-wrap justify-center gap-2 w-full h-full">
        <div className="p-3 w-full">
          {/* Search Bar */}
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
              placeholder="Search User ID, First name, Last name"
              required
              value={query}
              onChange={(e) => search(e)}
            />
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="pt-5">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="relative p-5 shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500 ">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-2">
                        Full Name
                      </th>
                      <th scope="col" className="px-6 py-2">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.items.map((user: User, index: number) => {
                      return (
                        <VolunteerRow
                          key={user.id}
                          user={user}
                          index={index}
                          volunteersArray={volunteersArray}
                        />
                      );
                    })}
                  </tbody>
                </table>

                <TablePagination
                  perPage={perPage}
                  page={page}
                  totalCount={Number(users.meta.totalCount)}
                  prevPage={() =>
                    setPage(Number(page) - 1 == 0 ? 1 : Number(page) - 1)
                  }
                  nextPage={() =>
                    setPage(
                      Number(page) + 1 > Number(users.meta.lastPage)
                        ? Number(users.meta.lastPage)
                        : Number(page) + 1
                    )
                  }
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="mt-5 flex flex-row">
        <Button
          onClick={handleSubmit(onSubmit ? onSubmit : defaultOnSubmit)}
          height="h-9"
          width="w-1/3"
          textSize="text-base"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

const VolunteerRow = ({
  user,
  index,
  volunteersArray
}: {
  user: User;
  index: number;
  volunteersArray: string[] | undefined;
}) => {
  const minusClick = () => {
    volunteersArray = volunteersArray?.filter((id) => id != user.id);
    console.log("removed user from volunteersArray");
  };
  const addClick = () => {
    volunteersArray?.push(user.id);
    console.log("pushed user to volunteersArray");
  };
  return (
    /** have a check to see if volunter id is in final array of volunteers, if it is dont list this volunteer */
    <tr
      className={`${
        index % 2 === 0 ? "bg-white" : "bg-secondary-50"
      } h-8 border-b hover:bg-gray-100`}
    >
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-3 font-medium text-gray-900 "
      >
        {user.firstName} {user.lastName}
      </th>
      <td className="px-6 py-3">{user.emailAddress}</td>
      <td className="px-0 py-3 flex">
        {/** check if this volunteer is in the array of volunteers to add, if so display minus, else plus.
         * If button is clicked on, add/delete from volunteersArray
         */}
        {volunteersArray?.includes(user.id) ? (
          <Button height="h-10" width="w-10" color="red" onClick={minusClick}>
            <div className="flex justify-center">
              <FaMinus />
            </div>
          </Button>
        ) : (
          <Button height="h-10" width="w-10" onClick={addClick}>
            <div className="flex justify-center">
              <FaPlus />
            </div>
          </Button>
        )}
      </td>
    </tr>
  );
};
