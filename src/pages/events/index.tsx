import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  faFilterCircleXmark,
  faPlus,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EventStatus } from "@prisma/client";
import { SortingState } from "@tanstack/react-table";
import { SubmitHandler } from "react-hook-form";

import EventFormEditButton from "@/components/Button/event-form-edit-button";
import HoverOpacityButton from "@/components/Button/hover-opacity-button";
import EventForm from "@/components/Forms/event-form";
import Modal from "@/components/Modal";
import { Pagination, PaginationState } from "@/components/pagination";
import ProfilePopover from "@/components/ProfilePopover";
import Search from "@/components/Search";
import { SearchBarRef } from "@/components/Search/SearchBar";
import Select from "@/components/select";
import SelectDate from "@/components/select-date";
import SelectUser from "@/components/select-user";
import Table from "@/components/table/table";
import { useCreateEvent, useEvents } from "@/hooks/events";
import { ItemType, useItemTypes } from "@/hooks/item-types";
import useSearchParamsState from "@/hooks/search-params-state";
import { formatDate } from "@/lib/datetime";
import { CreateEvent, User } from "@/types";

function EventTable() {
  const { mutate: createEvent } = useCreateEvent();
  const { data: itemTypes, isLoading: isItemTypesLoading } = useItemTypes();

  const [sortKey, setSortKey] = useState<string>("startDate");
  const [searchWord, setSearchWord] = useState<string>("");
  const searchBarRef = useRef<SearchBarRef>(null);
  const [sortMethod, setSortMethod] = useState<"asc" | "desc">("asc");

  // will toggle modal visibility for editing events
  const [showAddModal, setShowAddModal] = useState(false);

  const submitCreateEvent: SubmitHandler<CreateEvent> = async (data) => {
    createEvent(data, {
      onSuccess: () => {
        setShowAddModal(false);
      }
    });
  };

  const [pagination, onPaginationChange] = useState<PaginationState>({
    total: 100
  });

  const [sorting, onSortingChange] = useState<SortingState>([]);

  const [{ minDate, maxDate, userIds, eventTypes, status }, setFilterState] =
    useSearchParamsState({
      minDate: undefined,
      maxDate: undefined,
      userIds: [] as string[],
      eventTypes: [] as string[],
      status: [] as EventStatus[]
    });

  const date = useMemo(() => [minDate, maxDate], [minDate, maxDate]);
  const [users, setUsers] = useState<User[]>([]);

  const { data: eventData, isLoading: isEventsLoading } = useEvents({
    sortKey,
    sortMethod,
    searchWord,
    minDate,
    maxDate,
    eventType: eventTypes,
    eventStatus: status,
    createdBy: userIds
  });

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
      {/* main table*/}
      <div className="pt-4 px-16 flex flex-col gap-4">
        <div className="w-full flex justify-between">
          <div className="flex flex-row gap-4">
            <SelectUser
              label="Create By"
              value={users}
              onChange={(user) => {
                setUsers(user);
                setFilterState((state) => ({
                  ...state,
                  userIds: user.map((u) => u.id)
                }));
              }}
              multiple
              initialUserIds={userIds}
            />
            <SelectDate
              label="Date"
              value={date}
              onChange={([minDate, maxDate]) =>
                setFilterState((state) => ({ ...state, minDate, maxDate }))
              }
            />
            <Select
              treatEmptyAsAll
              multiple
              label="Type"
              options={(itemTypes as ItemType[])?.map(({ name }) => ({
                name,
                value: name
              }))}
              value={eventTypes}
              onChange={(eventTypes) =>
                setFilterState((state) => ({ ...state, eventTypes }))
              }
            />
            <Select
              treatEmptyAsAll
              multiple
              label="Status"
              options={Object.values(EventStatus).map((name) => ({
                name,
                value: name
              }))}
              value={status}
              onChange={(status) =>
                setFilterState((state) => ({ ...state, status }))
              }
            />
            <div className="text-center ">
              <HoverOpacityButton
                className="h-10 w-10 rounded-full bg-gray-100 text-gray-500"
                title="Clear Filters"
                onClick={() => {}}
              >
                <FontAwesomeIcon
                  icon={faFilterCircleXmark}
                  className="text-[1rem] transform translate-y-[2px]"
                />
              </HoverOpacityButton>
            </div>
          </div>
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
