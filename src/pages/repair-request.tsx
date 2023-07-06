import React from "react";
import { CiCirclePlus } from "react-icons/ci";

import Navbar from "@/components/Navbar";
import SearchBar from "@/components/repair-request/SearchBar";
import SortBy from "@/components/repair-request/SortBy";

import RepairRequestCard from "../components/repair-request/index";

export default function RepairRequest() {
  return (
    <>
      <Navbar />
      <div className="container">
        <p className="p-4 text-2xl font-bold text-[#6C727F]">Repair requests</p>
        <div className="container mx-auto">
          <div className="flex justify-end">
            {SortBy()}
            {SearchBar()}
          </div>
        </div>
        <div className="grid gap-4 p-4 lg:grid-cols-5 ">
          {getRepairContent()}
          <div className="flex w-full items-center justify-center rounded-lg border bg-white p-4">
            <CiCirclePlus color="#d9d9d9" size={100} />
          </div>
        </div>
        <span className="w-full border-b-[1px] border-gray-200 p-2"></span>
      </div>
    </>
  );
}
const getRepairContent = () => {
  const repair = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const content = [];
  for (let i = 0; i < repair.length; i++) {
    content.push(
      <div key={i}>
        <RepairRequestCard />
      </div>
    );
  }
  return content;
};
