import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { RepairRequest } from "@prisma/client";
import { CiCirclePlus } from "react-icons/ci";

import Card from "@/components/Cards/card";
import { HeaderProps } from "@/components/Header";
import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/index";
import SearchBar from "@/components/ui/SearchBar";
import SortBy from "@/components/ui/SortBy";
const inter = Inter({ subsets: ["latin"] });

export default function RepairRequest() {
  const [repairRequests, setRepairRequests] = useState<RepairRequest[]>([]);

  const [headerValues, setHeaderValues] = useState<HeaderProps>(
    {} as HeaderProps
  );

  const {
    query: { id: eventId }
  } = useRouter();

  // Getting the repair requests for this event
  useEffect(() => {
    if (!eventId) return;

    const params = new URLSearchParams();
    params.append("event", eventId as string);

    try {
      // Getting the repair requests for this event
      fetch(`/api/events/repair-request?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          setRepairRequests(data);
        });

      // Getting the event information
      fetch(`/api/events/get-event?${params.toString()}`)
        .then((res) => res.json())
        .then((event) => {
          setHeaderValues({
            name: event.name,
            location: event.location,
            startDate: event.startDate,
            endDate: event.endDate,
            createdBy: event.createdBy // TODO: Later get creator name from clerk, given userID
          });
        });
    } catch (err) {
      /* empty */
    }
  }, [eventId]);

  function newEvent() {
    alert("test");
  }

  return (
    <Sidebar>
      <main className={`ml-80 min-h-screen w-full p-4 ${inter.className}`}>
        <Header props={headerValues} />
        <div className="container">
          <div className="container mx-auto items-center">
            <div className="flex justify-between">
              <div className="w-auto p-4 text-2xl font-bold text-zinc-400">
                <span>Repair Requests ({repairRequests.length})</span>
              </div>
              <div className="flex justify-end">
                <SortBy />
                <SearchBar />
              </div>
            </div>
          </div>
          <div className="grid gap-4 p-4 sm:grid-rows-2 md:grid-rows-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
            {repairRequests.map((item) => (
              <div key={item.id}>
                <Card
                  props={{
                    title: item.id,
                    image: "/images/broken-clock-sad.jpg",
                    description: item.description,
                    status: item.status,
                    firstName: item.assignedTo,
                    lastName: "",
                    avatar: "/images/repair_lab_logo.jpg",
                    repairRequestProps: item
                  }}
                />
              </div>
            ))}
            <div
              className="flex w-full items-center justify-center rounded-lg border bg-grey-100 p-4 shadow-md transition hover:-translate-y-1 hover:cursor-pointer hover:bg-secondary-50"
              role="presentation"
              onClick={newEvent}
              onKeyDown={newEvent}
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
