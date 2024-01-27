import { useMemo } from "react";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EventStatus } from "@prisma/client";

import HoverOpacityButton from "@/components/Button/hover-opacity-button";
import Card from "@/components/Cards/event-card";
import NavBar from "@/components/NavBar";
import Select from "@/components/select";
import SelectDate from "@/components/select-date";
import LoadingSpinner from "@/components/UI/loading-spinner";
import { useEvents } from "@/hooks/events";
import { ItemType, useItemTypes } from "@/hooks/item-types";
import useMemoizedFn from "@/hooks/memorized-fn";
import useSearchParamsState from "@/hooks/search-params-state";
import { NextPageWithLayout } from "@/pages/_app";
import { EventResponse } from "@/types";
import { formatDate } from "@/utils";

const initialFilterState = {
  openModal: undefined,
  minDate: undefined,
  maxDate: undefined,
  search: undefined,
  sortKey: undefined,
  sortMethod: undefined as "asc" | "desc" | undefined,
  userIds: [] as string[],
  eventTypes: [] as string[],
  status: [] as EventStatus[]
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
      sortMethod,
      openModal
    },
    setFilterState
  ] = useSearchParamsState(initialFilterState);

  const date = useMemo(() => [minDate, maxDate], [minDate, maxDate]);

  const { data: eventData, isLoading: isEventsLoading } = useEvents({
    sortKey,
    sortMethod,
    minDate,
    maxDate,
    searchWord: search,
    eventType: eventTypes,
    eventStatus: status,
    createdBy: userIds
  });

  const resetQuery = useMemoizedFn(() => {
    setFilterState(initialFilterState);
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

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="flex justify-center mt-5 mx-5 gap-2 md:w-1/2">
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
              <FontAwesomeIcon
                icon={faFilterCircleXmark}
                className="text-[1rem] transform translate-y-[2px]"
              />
            </HoverOpacityButton>
          </div>
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
                location
              }: EventResponse) => (
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
              )
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
