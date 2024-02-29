import { useState } from "react";
import Image from "next/image";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import { Event } from "@/types";

export default function EventsCarousel({ events }: { events?: Event[] }) {
  const [currentEvent, setCurrentEvent] = useState(0);

  // Testing purposes
  events = events || [
    {
      id: "1",
      createdAt: new Date("2022-03-14T00:00:00.000Z"),
      updatedAt: new Date("2022-03-14T00:00:00.000Z"),
      startDate: new Date("2022-03-14T00:00:00.000Z"),
      endDate: new Date("2022-03-14T00:00:00.000Z"),
      status: "UPCOMING",
      createdBy: "Juan Dela Cruz",
      eventType: "Clothing Repair Workshop",
      disclaimer: "OONGA BOONGA DISCLAIMER",
      name: "Clothing Repair Workshop",
      description:
        "Have any torned clothes? Bring them to our clothing repair!",
      location: "Joombabab"
    },
    {
      id: "2",
      createdAt: new Date("2022-03-14T00:00:00.000Z"),
      updatedAt: new Date("2022-03-14T00:00:00.000Z"),
      startDate: new Date("2022-03-14T00:00:00.000Z"),
      endDate: new Date("2022-03-14T00:00:00.000Z"),
      status: "UPCOMING",
      createdBy: "Jimmy Bob",
      eventType: "Bike Repair Workshop",
      disclaimer: "OONGA BOONGA DISCLAIMER",
      name: "Bike Repair Workshop",
      description: "Have any torned bikes? Bring them to our bike repair!",
      location: "Perth"
    },
    {
      id: "3",
      createdAt: new Date("2022-03-14T00:00:00.000Z"),
      updatedAt: new Date("2022-03-14T00:00:00.000Z"),
      startDate: new Date("2022-03-14T00:00:00.000Z"),
      endDate: new Date("2022-03-14T00:00:00.000Z"),
      status: "ONGOING",
      createdBy: "Jumbo Slice",
      eventType: "Computer Repair Workshop",
      disclaimer: "OONGA BOONGA DISCLAIMER",
      name: "Computer Repair Workshop",
      description:
        "Have any torned computers? Bring them to our computer repair!",
      location: "Mars"
    }
  ];

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % events.length);
  };
  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <div className="m-auto relative w-full">
      <div className="flex overflow-hidden w-[340px] items-center m-auto rounded-t-lg">
        <div className="flex items-center gap-4">
          {events?.map((event) => (
            <div
              className=" shadow-lg shadow-darkAqua-700 w-[340px] transition-transform ease-in-out duration-500 hover:cursor-pointer z-10"
              key={event.id}
              style={{ transform: `translateX(-${currentEvent * 105}%` }}
            >
              <div className="w-full h-52 relative rounded-t-lg bg-slate-600 hover:cursor-pointer">
                <Image
                  src="/images/jeans_repair.jpg"
                  alt="A person repairing jeans"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-t-lg"
                />
              </div>

              <div className="rounded-b-lg bg-grey-100 pt-2 text-center text-xl">
                <span className="pb-10 font-bold">{event.name}</span>
                <div className="pt-2 text-sm">
                  <h1 className="font-bold">{event.location}</h1>
                  <h2>
                    {event.startDate.toDateString()} -{" "}
                    {event.endDate.toDateString()}
                  </h2>
                  <p className="pb-3 pl-10 pr-10 pt-2">{event.description}</p>
                </div>
                <div>
                  <h2>DISCLAIMER</h2>
                  <p className="text-sm">{event.disclaimer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute flex items-center justify-between inset-0 ">
        <button className="transition-all ease-in-out duration-150 hover:scale-125 active:scale-150">
          <BiChevronLeft size={80} color="white" onClick={prevEvent} />
        </button>
        <button className="transition-all ease-in-out duration-150 hover:scale-125 active:scale-150">
          <BiChevronRight size={80} color="white" onClick={nextEvent} />
        </button>
      </div>
    </div>
  );
}
