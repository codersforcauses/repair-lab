import React from "react";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { CiCirclePlus } from "react-icons/ci";

import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/index";

import VolunteerCard from "../components/repair-request/volunteer-card";

const inter = Inter({ subsets: ["latin"] });

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);

  function Volunteers() {
    const content = [];
    console.log(volunteers);
    for (let i = 0; i < volunteers.length; i++) {
      content.push(
        <div key={i}>
          <VolunteerCard name={volunteers[i]} />{" "}
          {/* //TODO: Get more volunteer info from clerk (email, phone number, etc) */}
        </div>
      );
    }
    return content;
  }

  useEffect(() => {
    const params = new URLSearchParams();
    const eventName = "Can Bob Fix It?" as string; // TODO: Get the actual event name that the event manager selected
    params.append("event", eventName);
    fetch(`/api/dashboard/get-volunteers?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setVolunteers(data);
      });
  }, []);

  return (
    <Sidebar>
      <main className={`ml-80 min-h-screen w-full p-4 ${inter.className}`}>
        <Header />
        <div className="container">
          <p className="p-4 text-2xl font-bold text-[#6C727F]">Volunteers</p>
          <div className="container mx-auto">
            <div className="flex justify-end"></div>
          </div>
          <div className="grid gap-4 p-4 lg:grid-cols-5 ">
            {Volunteers()}
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
