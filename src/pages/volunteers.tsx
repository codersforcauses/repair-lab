import React from "react";
import { Inter } from "next/font/google";
import { CiCirclePlus } from "react-icons/ci";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/index";

import VolunteerCard from "../components/repair-request/volunteer-card";

const inter = Inter({ subsets: ["latin"] });

function getRepairContent() {
  const repair = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const content = [];
  for (let i = 0; i < repair.length; i++) {
    content.push(
      <div key={i}>
        <VolunteerCard />
      </div>
    );
  }
  return content;
}

export default function Volunteers() {
  return (
    <Sidebar>
    <main className={`ml-80 min-h-screen w-full p-4 ${inter.className}`}>
      <Navbar />
      <div className="container">
      <p className="p-4 text-2xl font-bold text-[#6C727F]">Volunteers</p>
        <div className="container mx-auto">
          <div className="flex justify-end">
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
    </main>
    </Sidebar>
  );
}
  