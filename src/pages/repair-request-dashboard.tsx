/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { RepairRequest } from "@prisma/client";
import { CiCirclePlus } from "react-icons/ci";

import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/index";
import SearchBar from "@/components/ui/SearchBar";
import SortBy from "@/components/ui/SortBy";

import RepairRequestCard from "../components/repair-request/index";

const inter = Inter({ subsets: ["latin"] });

export default function RepairRequest() {
  const [repairRequests, setRepairRequests] = useState<RepairRequest[]>([]);

  interface RepairRequestCardProps {
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
    fetch(`/api/dashboard/repair-request?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setRepairRequests(data);
      });
  }, []);

  return (
    <Sidebar>
      <main className={`ml-80 min-h-screen w-full p-4 ${inter.className}`}>
        <div className="container">
          <Header />
          <div className="container mx-auto items-center">
            {/* <div className="flex justify-between">*/}
            <p className="p-4 text-2xl font-bold text-[#6C727F]">
              Repair requests
            </p>

            <div className="flex justify-end">
              <SortBy />
              <SearchBar />
            </div>
            {/* </div> */}
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
