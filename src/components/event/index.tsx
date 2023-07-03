import React from "react";
import { Event } from "@prisma/client";

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <>
      <div className="col-span-1 flex w-full justify-between rounded-lg border bg-[#EEEEEE] p-4">
        <div className="flex w-full flex-col leading-8 ">
          <p className="text-md font-bold">{event.name}</p>

          <p className="text-lg text-gray-500">
            Location:
            <span className="text-lg text-[black] ">{event.location}</span>
          </p>
          <p className="text-lg text-gray-500">
            Date time
            <span className="text-lg text-black">
              {event.startDate.toString()} -{event.endDate.toString()}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Cards;
