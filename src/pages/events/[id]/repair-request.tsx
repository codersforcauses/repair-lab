/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { RepairRequest } from "@prisma/client";
import { CiCirclePlus } from "react-icons/ci";

import RepairRequestCard from "@/components/Event/index";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar/index";
import SearchBar from "@/components/ui/SearchBar";
import SortBy from "@/components/ui/SortBy";

const inter = Inter({ subsets: ["latin"] });

export default function RepairRequest() {
  const [repairRequests, setRepairRequests] = useState<RepairRequest[]>([]);
  const [repairRequestCounter, setRepairRequestCounter] = useState<number>(0);

  interface RepairRequestCardProps {
    id: string;
    description: string;
    status: string;
    itemType: string;
    brand: string;
    volunteer: string;
  }

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
    return content; // Array of JSX elements
  }

  // Getting the repair requests for this event
  useEffect(() => {
    const params = new URLSearchParams();
    const eventName = "Can Bob Fix It?" as string;
    params.append("event", eventName);
    try {
      fetch(`/api/events/repair-request?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          setRepairRequestCounter(data.length);
          setRepairRequests(data);
        });
    } catch (err) {
      /* empty */
    }
  }, []);
  return (
    <Sidebar>
      <main className={`ml-80 min-h-screen w-full p-4 ${inter.className}`}>
        <Header />
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
