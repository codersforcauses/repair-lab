// Page for repairers to view their assigned events
import { useState } from 'react'
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";

import Box from "@/components/EventBox/Box";
import LoadingSpinner from "@/components/UI/loading-spinner";
import { useEvents } from "@/hooks/events";
import { Event } from "@/types";
const Home = () => {

  const router = useRouter();

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

  const { data: eventData, isLoading: isEventsLoading } = useEvents(
    sortKey,
    sortMethod,
    searchWord
  );

  const { userId } = useAuth();
  console.log(userId);

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

      {isEventsLoading ? (
        <div className="flex justify-center">
          <LoadingSpinner/>
        </div>
      ) : (
        /* Temporary test: will replace with a proper call to backend 
        If you are testing, put your own userId in (find it in console)*/
        (userId == "user_2YegcKa0KOns3791eORQdY7ERxY" || userId == "user_2YekxgT3DGBekKxfNK4xE0ndGkW")
          ? (
            <div className="relative flex-row items-center justify-center">
              <ul>{eventData.map((event: Event) => <Box key={event.id}
                eventId={event.id}
                eventTitle={event.name}
                startDate={formatDate(String(event.startDate))}
                endDate={formatDate(String(event.startDate))}
                description={event.description}
                location={event.location}
              />)}</ul>;
            </div>
          )
          : (
            <div className="relative flex w-full justify-center text-2xl mt-12 text-center text-slate-600 italic font-semibold  text-opacity-90">
              You have no assigned events.
            </div>
          )
      )}
    </div>
  );
};

export default Home;
