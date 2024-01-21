// Page for repairers to view their assigned events
import { useState } from "react";
import Image from "next/image";

import Box from "@/components/EventBox/box";
import LoadingSpinner from "@/components/UI/loading-spinner";
import { useEvents } from "@/hooks/events";
import { EventResponse } from "@/types";
import { formatDate } from "@/utils";

const Home = () => {
  const [sortKey] = useState<string>("startDate");
  const [searchWord] = useState<string>("");
  const [sortMethod] = useState<string>("asc");

  const { data: eventData, isLoading: isEventsLoading } = useEvents({
    sortKey,
    sortMethod,
    searchWord
  });

  return (
    <div>
      {/* HEADER BAR*/}
      <div className="relative z-10 mt-2 flex w-full justify-center">
        <Image
          src="/images/repair_lab_logo.png"
          alt="Repair Labs Logo"
          width={90}
          height={90}
        />
      </div>
      <h1 className="relative z-10 mt-2 text-xl flex w-full justify-center">
        My Events
      </h1>
      <hr className="mx-10" />

      {/* CONTENT */}
      {isEventsLoading ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : eventData ? (
        <div className="relative flex-row items-center justify-center mb-10">
          <ul id="eventList">
            {eventData.map(
              ({
                id,
                name,
                startDate,
                endDate,
                description,
                location
              }: EventResponse) => (
                <Box
                  key={id}
                  eventId={id}
                  eventTitle={name}
                  startDate={formatDate(String(startDate))}
                  endDate={formatDate(String(endDate))}
                  description={description}
                  location={location}
                />
              )
            )}
          </ul>
        </div>
      ) : (
        <div className="relative flex w-full justify-center text-2xl mt-12 text-center text-slate-600 italic font-semibold  text-opacity-90">
          You have no assigned events.
        </div>
      )}
    </div>
  );
};

export default Home;
