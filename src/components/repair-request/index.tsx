import React from "react";
import { CiCirclePlus } from "react-icons/ci";

const RepairRequest = () => {
  return (
    <div className="grid gap-4 p-4 lg:grid-cols-5">
      <div className="col-span-1 flex w-full justify-between rounded-lg border bg-[#EEEEEE] p-4">
        <div className="flex w-full flex-col leading-8 ">
          <p className="text-md font-bold">East Victoria Community</p>
          <p className="text-lg">
            Status: <span className="rounded-lg bg-green-200 p-1">Ongoing</span>
          </p>
          <p className="text-lg">
            Item type: <span>Laptop</span>
          </p>
          <p className="text-lg">
            Brand: <span>Dell</span>
          </p>
          <p className="text-lg">
            Volunteer: <span>Michael</span>
          </p>
        </div>
      </div>
      <div className="col-span-1 flex w-full justify-between rounded-lg border bg-[#EEEEEE] p-4">
        <div className="flex w-full flex-col leading-8 ">
          <p className="text-lg text-gray-500">
            Location: <span className="text-lg text-black ">East Vic Park</span>
          </p>
          <p className="text-lg text-gray-500">
            Date time:
            <span className="text-lg text-black ">
              28 June 2023 10:00 am - 12:00 pm
            </span>
          </p>
          <p className="text-lg text-gray-500">
            Status:
            <span className="rounded-lg bg-yellow-200 p-1 text-black">
              Booked
            </span>
          </p>
          <p className="text-lg">Event type: Cloths</p>
        </div>
      </div>
      <div className="col-span-1 flex w-full justify-between rounded-lg border bg-[#EEEEEE] p-4">
        <div className="flex w-full flex-col leading-8 ">
          <p className="text-lg">Location: East Vic Park</p>
          <p className="text-lg">Date time: 28 June 2023 10:00 am - 12:00 pm</p>
          <p className="text-lg">
            Status:
            <span className="rounded-lg bg-red-200 p-1">Finished</span>
          </p>
          <p className="text-lg">Event type: Eletronics</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-center rounded-lg border bg-white p-4">
        <CiCirclePlus color="#d9d9d9" size={100} />
      </div>
    </div>
  );
};

export default RepairRequest;
