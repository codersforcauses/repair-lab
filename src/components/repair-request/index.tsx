import React from "react";

export default function RepairRequestCard() {
  return (
    <div className="col-span-1 flex w-full justify-between rounded-3xl border bg-[#EEEEEE] p-4">
      <div className="flex w-full flex-col leading-8 ">
        <p className="text-md font-bold">Repair Description</p>
        <p className="text-lg">
          Status:
          <span className="bg-green-200 rounded-lg p-1">PENDING</span>
        </p>
        <p className="text-lg">
          Item type: <span>Laptop</span>
        </p>
        <p className="text-lg">
          Brand: <span>Dell</span>
        </p>
        <p className="text-lg">
          Volunteer: <span>Volunteer1</span>
        </p>
      </div>
    </div>
  );
}
