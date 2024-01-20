import { useState } from "react";

import Card from "@/components/Cards/event-card";
import NavBar from "@/components/NavBar";
import LoadingSpinner from "@/components/UI/loading-spinner";
import { useEvents } from "@/hooks/events";
import { NextPageWithLayout } from "@/pages/_app";
import { EventResponse } from "@/types";

const Events: NextPageWithLayout = () => {
  const [sortKey, setSortKey] = useState<string>("startDate");
  const [searchWord, setSearchWord] = useState<string>("");
  const [sortMethod, setSortMethod] = useState<string>("asc");
  const [expandedButton, setExpandedButton] = useState<string>("");

  const { data: eventData, isLoading: isEventsLoading } = useEvents(
    sortKey,
    sortMethod,
    searchWord
  );

  return (
    <div className="mt-4 mx-4 ">
      {isEventsLoading ? (
        <LoadingSpinner className="w-full h-full flex items-center justify-center absolute" />
      ) : eventData ? (
        <div className="grid gap-4 relative sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 ">
          {eventData.map(
            ({
              id,
              name,
              startDate,
              endDate,
              description,
              location
            }: EventResponse) => (
              <div key={id}>
                <Card
                  props={{
                    title: name,
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
