import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CiCirclePlus } from "react-icons/ci";

import { HeaderProps } from "@/components/Header";
import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/index";

// TODO: clean this up this is a place holder for now

export default function Images() {
  const [images, setImages] = useState([]);
  const [headerValues, setHeaderValues] = useState<HeaderProps>();

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

  const {
    query: { id: eventId }
  } = useRouter();

  useEffect(() => {
    if (!eventId) return;

    fetch(`/api/event/${eventId}}`)
      .then((res) => res.json())
      .then((event) => {
        setImages(event.images);
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
      <main className="ml-80 min-h-screen w-full p-4">
        <Header {...headerValues} />
        <div className="container">
          <div className="w-auto p-4 text-2xl font-bold text-zinc-400">
            <span>Images ({Images().length})</span>
          </div>
          <div className="container mx-auto">
            <div className="flex justify-end"></div>
          </div>
          <div className="grid gap-4 p-4 lg:grid-cols-5 ">
            {Images()}
            <div
              className="flex w-full items-center justify-center rounded-lg border bg-grey-100 p-4 shadow-md transition hover:-translate-y-1 hover:cursor-pointer hover:bg-secondary-50"
              role="presentation"
            >
              <CiCirclePlus color="rgb(82 82 91)" size={100} />
            </div>
          </div>
          <span className="w-full border-b-[1px] border-gray-200 p-2"></span>
        </div>
      </main>
    </Sidebar>
  );
}
