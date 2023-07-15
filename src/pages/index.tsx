import { Inter } from "next/font/google";
import Image from "next/image";

import Button from "@/components/Button/index";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="">
      <div className="h-screen w-screen bg-blue-100">
        <div className="relative h-1/3 w-full">
          <Image
            src="/images/landing.jpg"
            alt="Greyscale picture of water animal"
            fill={true}
            className="object-cover object-center"
          />
        </div>
        <div className="flex w-full -mt-16 justify-center relative z-10">
          <Image
            src="/images/repair_lab_logo.png"
            alt="Greyscale picture of water animal"
            width={500}
            height={500}
            className="h-28 w-28"
          />
        </div>
        <div className="">
          <div className="mb-10 text-center text-3xl font-bold mt-5">About Us</div>
          <div className="pl-10 pr-10 text-sm text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with
            the release of Letraset sheets containing Lorem Ipsum passages, and
            more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
      {/* Page 2 Start */}
      <div className="flex flex-col items-center justify-center bg-lightAqua-300 p-10">
        <span className="pb-6 text-2xl font-bold"> Upcoming Events </span>
        <div className="flex flex-col rounded-lg border">
          <div>
            <Image
              src="/images/event_details.jpg"
              alt="Large white bowl of fresh potato goodness"
              width={500}
              height={500}
              className="h-auto w-auto justify-center"
            />
          </div>

          <div className="bg-grey-100 pt-2 text-center text-xl">
            <span className="font-bold pb-10"> Event Name </span>
            <div className="text-sm pt-2"> 
              <h1 className="font-bold">National Potato Chip Day </h1>
              <h2>Date: March 14th</h2>
              <p className="pt-2 pl-10 pr-10 pb-3"> Lots of Potato Chip Eating, Potato merch, Baby Potatoes </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-auto bg-white mb-16">
        <div className="text-center text-2xl font-bold mt-10 mb-10">
          Submit item for repair
        </div>
        <div className="h-30 pr-10 pl-10 mt-5 mb-10">
        <Button aria-label="button"> New Request </Button>
        </div>
      </div>

      
    </div>
  );
}
