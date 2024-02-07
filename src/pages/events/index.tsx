import { useEffect, useMemo, useState } from "react";
import { EventStatus } from "@prisma/client";
import { SubmitHandler } from "react-hook-form";
import { FaFilterCircleXmark, FaPlus } from "react-icons/fa6";

import EventFormEditButton from "@/components/Button/event-form-edit-button";
import HoverOpacityButton from "@/components/Button/hover-opacity-button";
import EventForm from "@/components/Forms/event-form";
import Modal from "@/components/Modal";
import NavBar from "@/components/NavBar";
import { Pagination } from "@/components/pagination";
import { Search } from "@/components/Search";
import Select from "@/components/select";
import SelectDate from "@/components/select-date";
import { SelectUser, useUsersFromIds } from "@/components/select-user";
import Table from "@/components/table/table";
import { useCreateEvent, useEvents } from "@/hooks/events";
import { ItemType, useItemTypes } from "@/hooks/item-types";
import useMemoizedFn from "@/hooks/memorized-fn";
import useSearchParamsState from "@/hooks/search-params-state";
import { formatDate } from "@/lib/datetime";
import { NextPageWithLayout } from "@/pages/_app";
import { CreateEvent, User } from "@/types";

const initialFilterState = {
  openModal: undefined,
  minDate: undefined,
  maxDate: undefined,
  search: undefined,
  sortKey: undefined,
  sortMethod: undefined as "asc" | "desc" | undefined,
  userIds: [] as string[],
  eventTypes: [] as string[],
  status: [] as EventStatus[],
  page: "1",
  perPage: "20"
};

const Events: NextPageWithLayout = () => {
  const { mutate: createEvent } = useCreateEvent();
  const { data: itemTypes = [] } = useItemTypes();

  // will toggle modal visibility for editing events
  const [showAddModal, setShowAddModal] = useState(false);

  const submitCreateEvent: SubmitHandler<CreateEvent> = async (data) => {
    createEvent(data, {
      onSuccess: () => {
        setShowAddModal(false);
      }
    });
  };

  const [
    {
      minDate,
      maxDate,
      userIds,
      eventTypes,
      status,
      search,
      sortKey,
      sortMethod,
      openModal,
      page,
      perPage
    },
    setFilterState
  ] = useSearchParamsState(initialFilterState);

  const date = useMemo(() => [minDate, maxDate], [minDate, maxDate]);
  const [users, setUsers] = useState<User[]>([]);
  // Only fetch users when id exists but no user
  useUsersFromIds(users.length ? [] : userIds, setUsers);

  const { data, isLoading, isPlaceholderData, isFetching } = useEvents({
    sortKey,
    sortMethod,
    minDate,
    maxDate,
    searchWord: search,
    eventType: eventTypes,
    eventStatus: status,
    createdBy: userIds,
    page: Number(page),
    perPage: Number(perPage)
  });

  const isEventsLoading = isLoading || (isPlaceholderData && isFetching);

  const eventData = useMemo(() => data?.items, [data]);
  const pagination = useMemo(() => {
    return {
      page: Number(page),
      perPage: Number(perPage),
      totalCount: data?.meta?.totalCount ?? 0
    };
  }, [data?.meta?.totalCount, page, perPage]);

  const resetQuery = useMemoizedFn(() => {
    setFilterState(initialFilterState);
    setUsers([]);
  });

  const sortingState = useMemo(() => {
    return sortKey
      ? [
          {
            id: sortKey,
            desc: sortMethod === "desc"
          }
        ]
      : undefined;
  }, [sortKey, sortMethod]);

  // Allows Navbar 'New Event +' button to open /events with the Add new event modal open.
  useEffect(() => {
    if (openModal === "true") {
      setShowAddModal(true);
    }
  }, [openModal]);

  return (
    <div className="mt-20">
      {/* main table*/}
      <div className="pt-4 px-16 flex flex-col gap-4">
        <div className="w-full flex justify-between gap-x-2 gap-y-4 flex-wrap-reverse">
          <div className="flex flex-row gap-2">
            <SelectUser
              label="Created By"
              value={users}
              onChange={(user) => {
                setUsers(user);
                setFilterState((state) => ({
                  ...state,
                  userIds: user.map((u) => u.id)
                }));
              }}
              multiple
            />
            <SelectDate
              label="Date"
              value={date}
              onChange={([minDate, maxDate]) =>
                setFilterState((state) => ({ ...state, minDate, maxDate }))
              }
            />
            <Select
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
                onClick={resetQuery}
              >
                <div className="flex justify-center items-center bg-[color] rounded-full h-[size] w-[size]">
                  <FaFilterCircleXmark className="text-[1rem] transform translate-y-[2px]" />
                </div>
              </HoverOpacityButton>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Search
              className="relative w-5/12 flex-1 "
              value={search}
              onChange={(value) =>
                setFilterState((state) => ({ ...state, search: value }))
              }
            />
            <div className="text-center">
              <button
                className="h-10 w-10 rounded-full bg-gray-200 text-gray-500 focus:shadow-md"
                onClick={() => setShowAddModal(true)}
              >
                <div className="flex justify-center items-center bg-[color] rounded-full h-[size] w-[size]">
                  <FaPlus className="text-[1rem] transform " />
                </div>
              </button>
              <Modal
                setShowPopup={setShowAddModal}
                showModal={showAddModal}
                title="Add a New Event"
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
              sorting: sortingState
            }}
            onSortingChange={(updater) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore Table TS Error // todo: fix this inside table
              const nextState = updater(sortingState);
              setFilterState((state) => ({
                ...state,
                sortKey: nextState[0]?.id,
                sortMethod: nextState[0] && (nextState[0].desc ? "desc" : "asc")
              }));
            }}
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
                accessorKey: "startDate",
                accessorFn: (row) => formatDate(String(row.startDate)),
                header: "Date",
                enableSorting: true
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
        <Pagination
          value={pagination}
          onChange={(nextState) => {
            setFilterState((state) => ({
              ...state,
              page: String(nextState.page),
              perPage: String(nextState.perPage)
            }));
          }}
        />
      </div>
    </div>
  );
};

Events.getLayout = function getLayout(page) {
  return (
    <>
      <NavBar />
      {page}
    </>
  );
};
export default Events;
