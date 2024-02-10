import { useMemo } from "react";
import { EventStatus } from "@prisma/client";
import { FaFilterCircleXmark } from "react-icons/fa6";

import HoverOpacityButton from "@/components/Button/hover-opacity-button";
import Card from "@/components/Cards/event-card";
import NavBar from "@/components/NavBar";
import { Search } from "@/components/Search";
import Select from "@/components/select";
import SelectDate from "@/components/select-date";
import LoadingSpinner from "@/components/UI/loading-spinner";
import { useEvents } from "@/hooks/events";
import { ItemType, useItemTypes } from "@/hooks/item-types";
import useMemoizedFn from "@/hooks/memorized-fn";
import useSearchParamsState from "@/hooks/search-params-state";
import { NextPageWithLayout } from "@/pages/_app";
import { EventResponse, SortDirection } from "@/types";
import { formatDate } from "@/utils";

const initialFilterState = {
  openModal: undefined,
  minDate: undefined,
  maxDate: undefined,
  search: undefined,
  sortKey: undefined,
  sortMethod: undefined as SortDirection | undefined,
  userIds: [] as string[],
  eventTypes: [] as string[],
  status: [] as EventStatus[],
  page: "1",
  perPage: "20"
};

const Events: NextPageWithLayout = () => {
  const { data: itemTypes = [] } = useItemTypes();

  const [
    {
      minDate,
      maxDate,
      userIds,
      eventTypes,
      status,
      search,
      sortKey,
      sortMethod
    },
    setFilterState
  ] = useSearchParamsState(initialFilterState);

  const date = useMemo(() => [minDate, maxDate], [minDate, maxDate]);

  const { data, isLoading, isPlaceholderData, isFetching } = useEvents({
    sortKey,
    sortMethod,
    minDate,
    maxDate,
    searchWord: search,
    eventType: eventTypes,
    eventStatus: status,
    createdBy: userIds,
    page: 1,
    perPage: 20
  });

  const isEventsLoading = isLoading || (isPlaceholderData && isFetching);

  const eventData = useMemo(() => data?.items, [data]);

  const resetQuery = useMemoizedFn(() => {
    setFilterState(initialFilterState);
  });

  return (
    <div className="w-full mt-5">
      <hr className="mx-10" />
      <div className="sm:flex-row md:flex mt-3 mx-5  justify-between">
        <div className="flex gap-2 mb-3">
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
        </div>
      </div>
      <div className="mt-4 mx-4 flex justify-center align-items">
        {isEventsLoading ? (
          <LoadingSpinner className="w-full h-full flex items-center justify-center absolute" />
        ) : eventData ? (
          <div className="grid gap-4 relative sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
            {eventData.map(
              ({
                id,
                name,
                startDate,
                description,
                location,
                status
              }: EventResponse) =>
                status == "UPCOMING" ? (
                  <div key={id}>
                    <Card
                      props={{
                        title: name,
                        date: formatDate(String(startDate)),
                        location: location,
                        description: description
                      }}
                    />
                  </div>
                ) : null
            )}
          </div>
        ) : (
          <div className="relative flex w-full justify-center text-2xl mt-12 text-center text-slate-600 italic font-semibold  text-opacity-90">
            No upcoming events.
          </div>
        )}
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
