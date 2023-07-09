import React from "react";

interface RepairRequestCardProps {
  description: string;
  status: string;
  itemType: string;
  brand: string;
  volunteer: string;
}

export default function RepairRequestCard({
  props
}: {
  props: RepairRequestCardProps;
}) {
  return (
    <div className="col-span-1 flex w-full justify-between rounded-3xl border bg-[#EEEEEE] p-4">
      <div className="flex w-full flex-col leading-8 ">
        <p className="text-md font-bold">{props.description}</p>
        <p className="text-lg">
          Status:
          <span className="rounded-lg bg-green-200 p-1">{props.status}</span>
        </p>
        <p className="text-lg">
          Item type: <span>{props.itemType}</span>
        </p>
        <p className="text-lg">
          Brand: <span>{props.brand}</span>
        </p>
        <p className="text-lg">
          Volunteer: <span>{props.volunteer}</span>
        </p>
      </div>
    </div>
  );
}
