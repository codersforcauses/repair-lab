import React from "react";

export default function VolunteerCard({ name }: { name: string }) {
  return (
    <div className="col-span-1 flex w-full justify-between rounded-3xl border bg-[#EEEEEE] p-4">
      <div className="flex w-full flex-col leading-8 ">
        <p className="text-md font-bold">{name}</p>
      </div>
    </div>
  );
}
