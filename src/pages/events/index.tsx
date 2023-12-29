import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  faChevronDown,
  faChevronUp,
  faPlus,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EventStatus } from "@prisma/client";
import { SortingState } from "@tanstack/react-table";
import { SubmitHandler } from "react-hook-form";

import EventFormEditButton from "@/components/Button/event-form-edit-button";
import EventForm from "@/components/Forms/event-form";
import Modal from "@/components/Modal";
import { Pagination, PaginationState } from "@/components/pagination";
import ProfilePopover from "@/components/ProfilePopover";
import FilterGroup, { FilterState } from "@/components/table/filter-group";
import Search from "@/components/table/search";
import Table from "@/components/table/table";
import { useAuth } from "@/hooks/auth";
import { useCreateEvent, useEvents } from "@/hooks/events";
import { useItemTypes } from "@/hooks/item-types";
import { CreateEvent, Event } from "@/types";

function EventTable() {
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
  const [sortMethod, setSortMethod] = useState<string>("asc");
  const [expandedButton, setExpandedButton] = useState<string>("");

  const [showCreateForm, setShowCreateForm] = useState(false);

  const { mutate: createEvent } = useCreateEvent();
  const { data: eventData, isLoading: isEventsLoading } = useEvents(
    sortKey,
    sortMethod,
    searchWord
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
  const headers: { key: string; label: string }[] = [
    { key: "name", label: "Event Name" },
    { key: "createdBy", label: "Created By" },
    { key: "location", label: "Location" },
    { key: "startDate", label: "Date" },
    { key: "eventType", label: "Type" },
    { key: "status", label: "Status" }
  ];

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
    if (expandedButton === key) {
      setExpandedButton("");
    } else {
      setExpandedButton(key);
    }

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
    return (
      <button onClick={() => handleButtonClick(column)}>
        {" "}
        {column === expandedButton ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </button>
    );
  }

  const submitCreateEvent: SubmitHandler<CreateEvent> = async (data) => {
    createEvent(data, {
      onSuccess: () => {
        setShowAddModal(false);
      }
    });
  };

  const [filterState, setFilterState] = useState<FilterState>({});
  const [pagination, onPaginationChange] = useState<PaginationState>({
    total: 100
  });
  const [sorting, onSortingChange] = useState<SortingState>([]);

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

      <div className="pt-4 px-16 flex flex-col gap-4">
        <div className="w-full flex justify-between">
          <FilterGroup
            value={filterState}
            onChange={setFilterState}
            filters={[
              {
                title: "Type",
                name: "Type",
                options: [
                  { id: "All", text: "all" },
                  { id: "test", text: "test" }
                ]
              },
              {
                title: "Type2",
                name: "Type2",
                options: [
                  { id: "All", text: "all" },
                  { id: "test", text: "test" }
                ]
              }
            ]}
          />
          <div className="flex gap-4 items-center">
            <Search
              className="relative w-5/12 flex-1 "
              value={searchWord}
              onChange={setSearchWord}
              afterInput={
                <button
                  className="absolute right-8 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500"
                  onClick={() => {
                    // Handle search submit action here
                    console.log("Search submitted");
                  }}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              }
            />
            <div className="text-center">
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
        </div>
        <div className="flex justify-center">
          <Table
            loading={isEventsLoading}
            data={eventData}
            state={{
              sorting
            }}
            onSortingChange={onSortingChange}
            columns={[
              {
                accessorKey: "name",
                header: "Event Name",
                cell: (info) => (
                  <a href={`/events/${info.row.original.id}/repair-requests`}>
                    {info.getValue()}
                  </a>
                ),
                enableSorting: true
              },
              {
                accessorFn: (row) =>
                  [row.createdBy.firstName, row.createdBy.lastName]
                    .filter((n) => n)
                    .join(" "),
                header: "Created By"
              },
              { accessorKey: "location", header: "Location" },
              {
                accessorFn: (row) => formatDate(String(row.startDate)),
                header: "Date"
              },
              { accessorKey: "eventType", header: "Type" },
              { accessorKey: "status", header: "Status" },
              {
                header: "Edit",
                cell: (info) => (
                  <EventFormEditButton props={info.row.original} />
                )
              }
            ]}
          />
        </div>
        <Pagination value={pagination} onChange={onPaginationChange} />
      </div>
    </div>
  );
}

export default EventTable;
