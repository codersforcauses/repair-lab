import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  faChevronDown,
  faChevronRight,
  faChevronUp,
  faFilter,
  faPlus,
  faSearch,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EventStatus } from "@prisma/client";
import { SubmitHandler } from "react-hook-form";

import EventFormEditButton from "@/components/Button/event-form-edit-button";
import EventForm from "@/components/Forms/event-form";
import Modal from "@/components/Modal";
import ProfilePopover from "@/components/ProfilePopover";
import LoadingSpinner from "@/components/UI/loading-spinner";
import { useAuth } from "@/hooks/auth";
import { useCreateEvent, useEvents } from "@/hooks/events";
import { ItemType, useItemTypes } from "@/hooks/item-types";
import { useUsers } from "@/hooks/users";
import { isoToDatePickerValue } from "@/lib/datetime";
import { CreateEvent, Event, EventResponse, User } from "@/types";

type FilterType = "daterange" | "option" | "user";

function Table() {
  const router = useRouter();

  const upcoming: EventStatus = "UPCOMING";
  const ongoing: EventStatus = "ONGOING";
  const completed: EventStatus = "COMPLETED";

  function formatDate(dateString: string): string {
    const actualDate = new Date(dateString);
    const day = actualDate.getDate().toString().padStart(2, "0");
    const month = (actualDate.getMonth() + 1).toString().padStart(2, "0");
    const year = actualDate.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  const [sortKey, setSortKey] = useState<string>("startDate");
  const [searchWord, setSearchWord] = useState<string>("");
  const [sortMethod, setSortMethod] = useState<"asc" | "desc">("asc");

  // Filtering
  const [openFilterMenu, setOpenFilterMenu] = useState<string>("");
  const [dateFilter, setDateFilter] = useState({ startDate: "", endDate: "" });
  const [userFilter, setUserFilter] = useState<User[]>([]);
  const [columnFilters, setColumnFilters] = useState<
    Partial<Record<string, string[]>>
  >({});
  const toggleColumnFilterOption = (column: string, option: string) => {
    setColumnFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      const columnFilter = newFilters[column];
      if (columnFilter) {
        newFilters[column] = columnFilter.includes(option)
          ? columnFilter.filter((prevItem) => prevItem !== option)
          : [...columnFilter, option];
      }

      return newFilters;
    });
  };
  const updateColumnFilter = (column: string, filterList: string[]) => {
    setColumnFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      newFilters[column] = filterList;
      return newFilters;
    });
  };

  const [showCreateForm, setShowCreateForm] = useState(false);

  const { mutate: createEvent } = useCreateEvent();
  const { data: eventData, isLoading: isEventsLoading } = useEvents(
    sortKey,
    sortMethod,
    searchWord,
    dateFilter,
    columnFilters["eventType"] ?? [],
    columnFilters["status"] ?? [],
    userFilter.map((u) => u.id)
  );
  const { data: itemTypes } = useItemTypes();

  const { user, isLoaded, role } = useAuth();

  const [formData, setFormData] = useState<Partial<Event>>({
    id: undefined,
    name: "",
    createdBy: "",
    location: "",
    startDate: undefined,
    eventType: "",
    status: undefined
  });

  // The label is what users see, the key is what the server uses
  const headers: {
    key: string;
    label: string;
    filterType?: FilterType;
    filterOptions?: string[];
  }[] = useMemo(
    () => [
      { key: "name", label: "Event Name" },
      { key: "createdBy", label: "Created By", filterType: "user" },
      { key: "location", label: "Location" },
      { key: "startDate", label: "Date", filterType: "daterange" },
      {
        key: "eventType",
        label: "Type",
        filterType: "option",
        filterOptions: (itemTypes as ItemType[])?.map((v) => v.name)
      },
      {
        key: "status",
        label: "Status",
        filterType: "option",
        filterOptions: Object.values(EventStatus)
      }
    ],
    [itemTypes]
  );

  // Initialise filters
  useEffect(() => {
    const newFilters = { ...columnFilters };
    headers.forEach((header) => {
      if (header.filterOptions) {
        newFilters[header.key] = [...header.filterOptions];
      }
    });
    setColumnFilters(newFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headers]);

  // will toggle modal visibility for editing events
  const [showAddModal, setShowAddModal] = useState(false);

  // formats input data before passing it on
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    // Convert startDate to a Date object before assigning it
    if (name === "startDate") {
      const formattedDate = new Date(value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedDate
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  }

  function handleButtonClick(key: string) {
    // If the clicked column is already the sort key, toggle the sort method
    if (sortKey === key) {
      setSortMethod(sortMethod === "asc" ? "desc" : "asc");
    } else {
      // If it's a new column, set it as the sort key with ascending order
      setSortKey(key);
      setSortMethod("asc");
    }
  }
  function ToggleChevron(column: string) {
    const isActive = sortKey === column;
    const icon = isActive
      ? sortMethod === "asc"
        ? faChevronUp
        : faChevronDown
      : faChevronRight;

    return (
      <button onClick={() => handleButtonClick(column)}>
        <FontAwesomeIcon icon={icon} />
      </button>
    );
  }
  function FilterButton(
    column: string,
    filterType?: FilterType,
    options?: string[]
  ) {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    if (!filterType) return;

    let filterPicker = <></>;
    if (filterType == "user")
      filterPicker = (
        <UserFilter
          selectedUsers={userFilter}
          onListChange={(users) => setUserFilter([...users])}
          onClose={(e) => {
            if (
              buttonRef.current &&
              !buttonRef.current.contains(e.target as HTMLDivElement)
            )
              setOpenFilterMenu("");
          }}
        />
      );
    else if (filterType == "daterange") {
      filterPicker = (
        <FilterMenu
          onClose={(e) => {
            if (
              buttonRef.current &&
              !buttonRef.current.contains(e.target as HTMLDivElement)
            )
              setOpenFilterMenu("");
          }}
        >
          <ConciseInput
            label="From"
            id="startDate"
            type="date"
            value={dateFilter.startDate}
            onChange={(value) =>
              setDateFilter({ ...dateFilter, startDate: value })
            }
          />
          <ConciseInput
            label="To"
            id="endDate"
            type="date"
            value={dateFilter.endDate}
            onChange={(value) =>
              setDateFilter({ ...dateFilter, endDate: value })
            }
          />
        </FilterMenu>
      );
    } else {
      const isAllClicked =
        options &&
        options.every((element) => columnFilters[column]?.includes(element));
      filterPicker = (
        <FilterMenu
          onClose={(e) => {
            if (
              buttonRef.current &&
              !buttonRef.current.contains(e.target as HTMLDivElement)
            )
              setOpenFilterMenu("");
          }}
        >
          {options && (
            <>
              <label className="select-none block">
                <input
                  type="checkbox"
                  onChange={() =>
                    updateColumnFilter(column, isAllClicked ? [] : [...options])
                  }
                  checked={isAllClicked}
                ></input>{" "}
                <strong>All</strong>
              </label>
              {options?.map((option) => (
                <label key={option} className="select-none block">
                  <input
                    type="checkbox"
                    onChange={() => toggleColumnFilterOption(column, option)}
                    checked={columnFilters[column]?.includes(option)}
                  ></input>{" "}
                  {option}
                </label>
              ))}
            </>
          )}
        </FilterMenu>
      );
    }
    return (
      <>
        <button
          ref={buttonRef}
          onClick={() => {
            setOpenFilterMenu(openFilterMenu === column ? "" : column);
          }}
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>
        {openFilterMenu === column && filterPicker}
      </>
    );
  }
  const submitCreateEvent: SubmitHandler<CreateEvent> = async (data) => {
    createEvent(data, {
      onSuccess: () => {
        setShowAddModal(false);
      }
    });
  };

  return (
    <div>
      {/* HEADER BAR*/}
      <div className=" flex w-full flex-row border-b-[2px] border-slate-300 ">
        <Image
          className="m-10 mb-5 mt-5"
          src="/images/repair_lab_logo.jpg"
          alt="logo"
          width="90"
          height="90"
        />
        <h1 className="mt-[50px] text-3xl font-semibold text-slate-600">
          {" "}
          Event Listings
        </h1>

        {/* ACCOUNT AREA*/}
        <div className="absolute right-10 self-center justify-self-end">
          {/* Profile Pop Over */}
          <ProfilePopover />
        </div>
      </div>

      {/* Search bar above table */}
      <div className="flex justify-center">
        <div className="relative w-5/12 p-4">
          <input
            className="h-10 w-full rounded-3xl border-none bg-gray-100 bg-gray-200 px-5 py-2 text-sm focus:shadow-md focus:outline-none "
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <button
            className="absolute right-8 top-2/4 -translate-y-2/4 transform cursor-pointer text-gray-500"
            onClick={() => {
              // Handle search submit action here
              console.log("Search submitted");
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        {/* Add event button*/}
        <div className=" p-4 text-center ">
          <button
            className="h-10 w-10 rounded-full bg-gray-200 text-gray-500 focus:shadow-md"
            onClick={() => setShowAddModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <Modal
            setShowPopup={setShowAddModal}
            showModal={showAddModal}
            height="h-3/4"
          >
            <EventForm itemTypes={itemTypes} onSubmit={submitCreateEvent} />
          </Modal>
        </div>
      </div>

      {/* main table*/}
      <div className="flex justify-center">
        <div className="container block w-full justify-center">
          <table className="w-10/12 table-auto rounded-lg m-auto">
            <thead>
              <tr className="border-b bg-lightAqua-200 pb-10 text-left ">
                {headers.map((col) => (
                  <th key={col.key} className="p-2.5 pl-5 font-normal relative">
                    {" "}
                    {col.label} {ToggleChevron(col.key)}{" "}
                    {FilterButton(col.key, col.filterType, col.filterOptions)}
                  </th>
                ))}
                <th className="w-10 p-2.5 text-justify font-normal"> Edit </th>
              </tr>
            </thead>

            <tbody className="bg-secondary-50">
              {eventData &&
                eventData.map((event: EventResponse) => {
                  return (
                    <tr
                      key={event.name}
                      className="first:ml-50 border-b p-2.5 last:mr-10 even:bg-slate-100 hover:bg-slate-200"
                    >
                      <td className="pl-5 font-light">
                        <button
                          className="text-sm"
                          onClick={() =>
                            router.push(
                              "/events/" + event.id + "/repair-requests"
                            )
                          }
                        >
                          {event.name}
                        </button>
                      </td>
                      <td className="p-2.5 text-sm font-light">
                        {event.createdBy.firstName} {event.createdBy.lastName}
                      </td>
                      <td className="text-sm font-light">{event.location}</td>
                      <td className="text-sm font-light">
                        {formatDate(String(event.startDate))}
                      </td>
                      <td className="text-sm font-light">{event.eventType}</td>
                      <td className="text-sm font-light">{event.status}</td>
                      <td className="align-center ml-0 p-2.5 pl-0 text-center">
                        <EventFormEditButton props={event} />
                      </td>
                    </tr>
                  );
                })}
              {isEventsLoading && (
                <tr className=" h-40">
                  <td colSpan={headers.length + 1}>
                    <div className="w-full h-full flex items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;

function UserFilter({
  onClose,
  onListChange,
  selectedUsers
}: {
  onClose?: (event: MouseEvent) => void;
  onListChange?: (user: User[]) => void;
  selectedUsers: User[];
}) {
  const [userSearch, setUserSearch] = useState<string>("");
  const { data: users, isLoading } = useUsers(10, 1, "-created_at", userSearch);

  const addUser = (user: User) =>
    onListChange &&
    !selectedUsers.some((other) => other.id === user.id) &&
    onListChange([...selectedUsers, user]);
  const removeUserByIndex = (index: number) =>
    onListChange &&
    onListChange([
      ...selectedUsers.slice(0, index),
      ...selectedUsers.slice(index + 1)
    ]);
  // perhaps display the user list in the search box, similar to atlassian?

  return (
    <FilterMenu onClose={(e) => onClose && onClose(e)}>
      <div className="w-80">
        {/* Selected list*/}
        <div className="relative mb-4 overflow-x-scroll h-8 bg-gray-100 flex items-center text-xs">
          {selectedUsers.map((user: User, index) => (
            <div
              key={user.id}
              className="flex h-5/6 p-1 bg-gray-200 rounded-sm ml-1 mr-1"
            >
              <div className="h-full aspect-square rounded-full block mr-2 overflow-hidden flex-grow-0 flex-shrink-0">
                <Image
                  src="/images/repair_lab_logo.png"
                  width={30}
                  height={30}
                  alt="repair-labs"
                  className="h-full object-cover  "
                />
              </div>{" "}
              <div className="block overflow-hidden text-clip whitespace-nowrap">
                {user.firstName} {user.lastName}
              </div>
              <button
                className="ml-2 hover:opacity-60"
                onClick={() => {
                  removeUserByIndex(index);
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          ))}
          {selectedUsers.length == 0 && (
            <div className="w-min ml-2 opacity-30 pointer-events-none">
              Empty
            </div>
          )}
        </div>

        {/* User search*/}
        <div className="relative mb-4">
          <input
            className="h-10 w-full rounded-3xl border-none bg-gray-100 px-5 py-2 text-sm focus:shadow-md focus:outline-none "
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => setUserSearch(e.target.value)}
          />

          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-4 top-2/4 -translate-y-2/4 transform pointer-events-none text-gray-500"
          />
        </div>
        {/* Results list*/}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col">
            {users.items.map((user: User) => (
              <button
                key={user.id}
                className="flex h-8 p-1 hover:bg-slate-200 w-full rounded-sm"
                onClick={() => addUser(user)}
              >
                <div className="h-full aspect-square rounded-full block mr-2 overflow-hidden flex-grow-0 flex-shrink-0">
                  <Image
                    src="/images/repair_lab_logo.png"
                    width={30}
                    height={30}
                    alt="repair-labs"
                    className="h-full object-cover  "
                  />
                </div>
                <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
                  {user.firstName} {user.lastName} {user.emailAddress}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </FilterMenu>
  );
}

function FilterMenu({
  onClose,
  children
}: {
  onClose: (event: MouseEvent) => void;
  children: ReactNode;
}) {
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target as HTMLDivElement)
    )
      onClose(event);
  };

  return (
    <div
      ref={filterRef}
      className="absolute inset-x-0 top-50 mt-2.5 bg-white p-4 shadow-md mx-auto rounded-2xl text-left max-h-72 overflow-y-scroll min-w-fit"
    >
      {children}
    </div>
  );
}

/** Displays label over the border */
function ConciseInput({
  label,
  id,
  type,
  value,
  onChange
}: {
  label: string;
  id: string;
  type: React.HTMLInputTypeAttribute;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const convertedValue =
    value && type === "date"
      ? isoToDatePickerValue(new Date(value)).substring(0, 10)
      : value;
  return (
    <div className="border-gray-500 border p-2 relative rounded-lg mb-4 last:mb-0">
      <label
        htmlFor={id}
        className="absolute -top-1/3 left-1 px-2 bg-white font-bold"
      >
        {label}
      </label>
      <input
        className="appearance-none border-none outline-none"
        id={id}
        type={type}
        value={convertedValue}
        onChange={(e) => {
          const value =
            type === "date"
              ? new Date(e.target.value).toISOString()
              : e.target.value;
          if (onChange) onChange(value);
        }}
      ></input>
    </div>
  );
}
