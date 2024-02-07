import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

import Button from "@/components/Button";
import Search from "@/components/Search";
import TablePagination from "@/components/table/table-pagination";
import LoadingSpinner from "@/components/UI/loading-spinner";
import { useUsers } from "@/hooks/users";
import { User } from "@/types";

/**
 * A component for managing volunteers for a repair event.
 * Takes care of adding and removing volunteers from an event.
 * @param setShowModal - A useState function to set the showModal state (if used in a modal).
 * @param volunteersArray - An array of volunteer ids that are already assigned to the event.
 * @param onSubmit - A custom function to call when the form is submitted.
 * @returns A div that contains a search bar, table, and submit button for modifying an event's volunteers
 */
export default function VolunteerManageForm({
  volunteersArray,
  onSubmit,
  setShowModal
}: {
  volunteersArray?: string[];
  onSubmit?: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  volunteersArray = volunteersArray ?? [];
  const [volunteers, setVolunteers] = useState(volunteersArray); // TODO: This is actually an array of volunteer ids, so later we need to get the volunteer info from the clerk

  // Constants for table - this is from the /users endpoint
  const [orderBy, _setOrderBy] = useState("-created_at");
  const [perPage, _setPerPage] = useState(8);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  // TODO - update this to use a new hook or endpoint instead of useUsers
  // It is currently using the same endpoint as /users
  const { data: users, isLoading } = useUsers(perPage, page, orderBy, query);
  const search = (value: string) => {
    // will need to setPage back to 1 otherwise it will be looking at the last page
    setPage(1);
    setQuery(value);
  };

  // TODO implement backend to handle this - check issue 113 or 116
  // Default submit handler
  const defaultOnSubmit = async () => {
    console.log(volunteers);
    setShowModal(false);
    // updates the database with new users
  };

  return (
    <div className="m-1 flex flex-col justify-between gap-2 w-full h-full p-3">
      {/* Search Bar */}
      <Search onChange={search} />

      {/* Table - taken from /users */}
      {isLoading ? (
        <div className="pt-5">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="relative p-2 shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 truncate">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr className="px-6">
                  <th scope="col" className="px-6 py-2">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-2 text-center">
                    Add/Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.items.map((user: User, index: number) => {
                  return (
                    <VolunteerRow
                      key={user.id}
                      user={user}
                      index={index}
                      volunteersArray={volunteers}
                      setVolunteersArray={setVolunteers}
                    />
                  );
                })}
              </tbody>
            </table>

            {/* TODO update to new Pagination component */}
            <TablePagination
              perPage={perPage}
              page={page}
              totalCount={Number(users?.meta.totalCount)}
              prevPage={() =>
                setPage(Number(page) - 1 == 0 ? 1 : Number(page) - 1)
              }
              nextPage={() =>
                setPage(
                  Number(page) + 1 > Number(users?.meta.lastPage)
                    ? Number(users?.meta.lastPage)
                    : Number(page) + 1
                )
              }
            />
          </div>
        </>
      )}
      {/* Submit */}
      <div className="mt-3 flex flex-col">
        <p className="text-sm pb-2">Adding {volunteers.length} volunteers</p>
        <Button
          onClick={onSubmit ? onSubmit : defaultOnSubmit}
          height="h-9"
          width="w-full"
          textSize="text-base"
        >
          Save
        </Button>
      </div>
    </div>
  );
}

/**
 * A component for each row in the table for volunteerManageForm.
 * @param user - A user object
 * @param index - The index of the user in the table
 * @param volunteersArray - An array of volunteer ids that are already assigned to the event.
 * @param setVolunteersArray - A useState function to set the volunteersArray state.
 * @returns A row in the table for volunteerManageForm.
 */
const VolunteerRow = ({
  user,
  index,
  volunteersArray,
  setVolunteersArray
}: {
  user: User;
  index: number;
  volunteersArray: string[];
  setVolunteersArray: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const minusClick = () => {
    setVolunteersArray(volunteersArray.filter((id) => id != user.id));
  };
  const addClick = () => {
    setVolunteersArray([...volunteersArray, user.id]);
  };
  return (
    /** have a check to see if volunter id is in final array of volunteers, if it is dont list this volunteer */
    <tr
      className={`${
        index % 2 === 0 ? "bg-white" : "bg-secondary-50"
      } h-8 border-b hover:bg-gray-100`}
    >
      <th scope="row" className="px-6 py-2 font-medium text-gray-900">
        {user.firstName} {user.lastName}
      </th>
      <td className="px-6 py-2">{user.emailAddress}</td>
      <td className="px-6 py-2 flex justify-center text-center">
        {/** check if this volunteer is in the array of volunteers to add, if so display minus, else plus.
         * If button is clicked on, add/delete from volunteersArray
         */}
        {volunteersArray?.includes(user.id) ? (
          <Button
            height="h-8 flex justify-center align-middle items-center"
            width="w-8"
            color="bg-red-500"
            hover="hover:bg-red-700"
            onClick={minusClick}
          >
            <FaMinus />
          </Button>
        ) : (
          <Button
            height="h-8 flex justify-center align-middle items-center"
            width="w-8"
            onClick={addClick}
          >
            <FaPlus />
          </Button>
        )}
      </td>
    </tr>
  );
};
