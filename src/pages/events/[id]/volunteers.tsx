import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { CiCirclePlus } from "react-icons/ci";

import AssigneeBadge from "@/components/Cards/assignee-badge";
import { HeaderProps } from "@/components/Header";
import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/index";

const inter = Inter({ subsets: ["latin"] });

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [headerValues, setHeaderValues] = useState<HeaderProps>(
    {} as HeaderProps
  );

  const {
    query: { id: eventId }
  } = useRouter();

  useEffect(() => {
    if (!eventId) return;

    const params = new URLSearchParams();
    params.append("event", eventId as string);
    fetch(`/api/events/get-event?${params.toString()}`)
      .then((res) => res.json())
      .then((event) => {
        setVolunteers(event.volunteers); // TODO: This is actually an array of volunteer ids, so later we need to get the volunteer info from the clerk
        setHeaderValues({
          name: event.name,
          location: event.location,
          startDate: event.startDate,
          endDate: event.endDate,
          createdBy: event.createdBy // TODO: Later get name from clerk, given userID
        });
      });
  }, [eventId]);

  return (
    <Sidebar>
      <main className={`ml-80 min-h-screen w-full p-4 ${inter.className}`}>
        <Header props={headerValues} />
        <div className="container">
          <div className="w-auto p-4 text-2xl font-bold text-zinc-400">
            <span>Volunteers ({volunteers.length})</span>
          </div>
          <div className="container mx-auto">
            <div className="flex justify-end"></div>
          </div>
          <div className="grid gap-4 p-4 lg:grid-cols-5 ">
            {volunteers.map((item) => (
              <div key={item}>
                <AssigneeBadge firstName={item} />
              </div>
            ))}
            <div
              className="flex w-full items-center justify-center rounded-lg border bg-grey-100 p-4 shadow-md transition hover:-translate-y-1 hover:cursor-pointer hover:bg-secondary-50"
              role="presentation"
            >
              <CiCirclePlus color="rgb(82 82 91)" size={100} />
            </div>
          </div>
          <span className="w-full border-b-[1px] border-gray-200 p-2"></span>
        </div>
      </main>
    </Sidebar>
  );
}
