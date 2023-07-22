import React from "react";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { CiCirclePlus } from "react-icons/ci";

import { HeaderProps } from "@/components/Header";
import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/index";

// TODO: clean this up this is a place holder for now
const inter = Inter({ subsets: ["latin"] });

export default function Images() {
  const [images, setImages] = useState([]);
  const [headerValues, setHeaderValues] = useState<HeaderProps>(
    {} as HeaderProps
  );

  const {
    query: { id: eventId }
  } = useRouter();
  
  function Images() {
    const content = [];
    // TODO: extract image from s3*/}

    for (let i = 0; i < Images.length; i++) {
      content.push(
        <div>
          <Image src={images[i]} alt="event image" width={300} height={300} />
        </div>
      );
    }
    return content;
  }

  useEffect(() => {
    if (!eventId) return;
    const params = new URLSearchParams();
    params.append("event", eventId as string);
    fetch(`/api/dashboard/get-event?${params.toString()}`)
      .then((res) => res.json())
      .then((event) => {
        setImages(event.images); // TODO: This is actually an array of volunteer ids, so later we need to get the volunteer info from the clerk
        setHeaderValues({
          name: event.name,
          location: event.location,
          startDate: event.startDate,
          endDate: event.endDate,
          createdBy: event.createdBy // TODO: Later get name from clerk, given userID
        });
      });
  }, [eventId]);

  return (
    <Sidebar>
      <main className={`ml-80 min-h-screen w-full p-4 ${inter.className}`}>
        <Header props={headerValues} />
        <div className="container">
          <div className="w-auto p-4 text-2xl font-bold text-zinc-400">
            <span>Images ({Images().length})</span>
          </div>
          <div className="container mx-auto">
            <div className="flex justify-end"></div>
          </div>
          <div className="grid gap-4 p-4 lg:grid-cols-5 ">
            {Images()}
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
