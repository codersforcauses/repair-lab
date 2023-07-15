import Image from "next/image";

import Button from "@/components/Button/index";

export default function Home() {
  return (
    <div className="bg-lightAqua-100">
      <div className="relative h-44 w-full">
        <Image
          src="/images/landing.jpg"
          alt="Greyscale picture of water animal"
          fill={true}
          className="object-cover object-center"
        />
      </div>
      <div className="relative z-10 -mt-16 flex w-full justify-center">
        <Image
          src="/images/repair_lab_logo.png"
          alt="Greyscale picture of water animal"
          width={500}
          height={500}
          className="h-28 w-28"
        />
      </div>
      <div className="mb-16">
        <div className="mb-10 mt-5 text-center text-3xl font-bold">
          About Us
        </div>
        <div className="pl-10 pr-10 text-center text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-lightAqua-300 p-10">
        <span className="pb-6 text-2xl font-bold"> Upcoming Events </span>
        <div className="flex flex-col">
          <div>
            <Image
              src="/images/event_details.jpg"
              alt="Large white bowl of fresh potato goodness"
              width={500}
              height={500}
              className="h-auto w-auto justify-center rounded-t-lg"
            />
          </div>
          <div className="rounded-b-lg bg-grey-100 pt-2 text-center text-xl">
            <span className="pb-10 font-bold"> Event Name </span>
            <div className="pt-2 text-sm">
              <h1 className="font-bold">National Potato Chip Day </h1>
              <h2>Date: March 14th</h2>
              <p className="pb-3 pl-10 pr-10 pt-2">
                {" "}
                Lots of Potato Chip Eating, Potato merch, Baby Potatoes{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-16 h-auto bg-white">
        <div className="pb-5 pt-16 text-center text-2xl font-bold">
          Submit item for repair
        </div>
        <div className="h-30 mb-10 mt-5 pl-10 pr-10">
          <Button aria-label="button"> New Request </Button>
        </div>
      </div>
    </div>
  );
}
