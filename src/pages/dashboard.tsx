import React from "react";

import Cards from "@/components/cards/index";
import RepairRequest from "@/components/repair-request/index";

export default function Dashboard() {
  return (
    <>
      <div className="flex justify-between gap-4 px-4 pb-20 pt-12 ">
        <h1 className="text-2xl text-[#6C727F]">St Catherine’s Repair Event</h1>
        <h1 className="mr-8 text-2xl text-[#6C727F]">
          Event Manager: <span className="text-[#303030]">Dan Hil </span>
        </h1>
      </div>
      <p className="p-4 text-2xl font-bold text-[#6C727F]"> Information </p>
      <Cards />
      <p className="p-4 text-2xl font-bold text-[#6C727F]">Repair requests</p>
      <span className="w-full border-b-[1px] border-gray-200 p-2"></span>
      <RepairRequest />
    </>
  );
}
