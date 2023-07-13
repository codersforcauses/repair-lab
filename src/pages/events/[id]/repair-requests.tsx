/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { RepairRequest } from "@prisma/client";
import { CiCirclePlus } from "react-icons/ci";

import { RepairRequestCardProps } from "@/components/event/index";
import RepairRequestCard from "@/components/event/index";
import { HeaderProps } from "@/components/Header";
import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/index";
import SearchBar from "@/components/ui/SearchBar";
import SortBy from "@/components/ui/SortBy";
const inter = Inter({ subsets: ["latin"] });

export default function RepairRequest() {
  const [repairRequests, setRepairRequests] = useState<RepairRequest[]>([]);
  const [repairRequestCounter, setRepairRequestCounter] = useState<number>(0);

  const [headerValues, setHeaderValues] = useState<HeaderProps>(
    {} as HeaderProps
  );
  const [eventId, setEventId] = useState<string>("" as string);

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      // ensures that the router query parameters are ready
      setEventId(router.query.id as string);
    }
  }, [router.isReady, router.query.id]);

  function RepairContent() {
    const content = [];

    for (let i = 0; i < repairRequests.length; i++) {
      const props: RepairRequestCardProps = {
        id: repairRequests[i].id,
        description: repairRequests[i].description,
        status: repairRequests[i].status,
        itemType: repairRequests[i].itemType,
        brand: repairRequests[i].itemBrand,
        volunteer: repairRequests[i].assignedTo
      };
      content.push(
        <div key={i}>
          <RepairRequestCard props={props} />
        </div>
      );
    }
    return content.map((card) => [card, card, card, card]); // Temporary: this is to test scrolling with many cards
  }

  // Getting the repair requests for this event
  useEffect(() => {
    const params = new URLSearchParams();
    params.append("event", eventId);
    try {
      // Getting the repair requests for this event
      fetch(`/api/events/repair-request?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          setRepairRequestCounter(data.length);
          setRepairRequests(data);
        });

      // Getting the event information
      fetch(`/api/dashboard/get-event?${params.toString()}`)
        .then((res) => res.json())
        .then((event) => {
          setHeaderValues({
            name: event.name,
            location: event.location,
            startDate: event.startDate,
            endDate: event.endDate,
            createdBy: event.createdBy // TODO: Later get name from clerk, given userID
          });
        });
    } catch (err) {
      /* empty */
    }
  }, [eventId]);
  return (
    <Sidebar>
      <main className={`ml-80 min-h-screen w-full p-4 ${inter.className}`}>
        <Header props={headerValues} />
        <div className="container">
          <div className="container mx-auto items-center">
            <div className="flex justify-between">
              <div className="w-auto p-4 text-2xl font-bold text-zinc-400">
                <span>Results({repairRequestCounter})</span>
              </div>
              <div className="flex justify-end">
                <SortBy />
                <SearchBar />
              </div>
            </div>
          </div>
          <div className="grid gap-4 p-4 lg:grid-cols-5 ">
            {RepairContent()}
            <div className="flex w-full items-center justify-center rounded-lg border bg-white p-4">
              <CiCirclePlus color="#d9d9d9" size={100} />
            </div>
          </div>
          <span className="w-full border-b-[1px] border-gray-200 p-2"></span>
        </div>
      </main>
    </Sidebar>
  );
}
