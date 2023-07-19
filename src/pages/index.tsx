import Image from "next/image";

import Button from "@/components/Button/index";

export default function Home() {
  return (
    <div className="bg-lightAqua-100">
      <div className="relative h-44 w-full">
        <Image
          src="/images/sewing_box.jpg"
          alt="box of sewing equipment"
          fill={true}
          className="object-cover object-center"
        />
      </div>
      <div className="relative z-10 -mt-16 flex w-full justify-center">
        <Image
          src="/images/repair_lab_logo.png"
          alt="Repair Labs Logo"
          width={112}
          height={112}
        />
      </div>
      <div className="mb-16">
        <div className="mb-8 mt-5 text-center text-3xl font-bold">About Us</div>
        <div className="text-ml flex flex-col pl-10 pr-10">
          <div className="flex flex-col justify-center">
            <div className="relative flex w-full justify-center">
              <Image
                src="/images/generalToy.jpeg"
                alt="box of sewing equipment"
                width={400}
                height={300}
              />
            </div>

            <ul className="tlex grid list-none justify-center gap-y-2 pr-4">
              <li className="mt-6">
                Repair Lab is a zero budget volunteer group with 100%
                volunteers, consisting of a group of locals who care for their
                community and the environment.
              </li>

              <li>
                People who think that we can do more than only recycle and buy
                new.
              </li>

              <li>
                Who think that we can not only make an impact by repairing stuff
                but also learning repair skills and enjoy doing so.
              </li>

              <li className="border-b-2 border-darkAqua-600 pb-8">
                We hope that there will be many Repair Labs in Perth and the
                rest of WA following after our pilot in October 2017.
              </li>
            </ul>

            <div className="relative mt-8 flex w-full justify-center">
              <Image
                src="/images/Repair_Lab_bikerepair.jpg"
                alt="bike repair"
                width={400}
                height={300}
              />
            </div>

            <ul className="tlex grid list-none justify-center gap-y-2 pr-4">
              <li className="mt-6">
                We are always on the lookout for more volunteers.
              </li>

              <li>
                Especially people with electrical knowledge are on high demand.
              </li>

              <li>
                But also people who can repair toys, bikes, furniture, clothing,
                jewellery, curtains, household items, garden tools, etc. etc.
              </li>

              <li>
                Sometimes it is not only repair skills as well as care
                instructions. Maybe you can teach others how to keep your tools
                in mint condition, or how to crochet.
              </li>

              <li>
                If you are handy or have a good repair skills and eager to share
                them with your community, please contact us.
              </li>

              <li>Wilma & Flavia</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-lightAqua-300 p-10">
        <span className="pb-6 text-2xl font-bold"> Upcoming Events </span>
        <div className="flex flex-col">
          <Image
            src="/images/event_details.jpg"
            alt="Large white bowl of fresh potato goodness"
            width={500}
            height={500}
            className="rounded-t-lg"
          />
          <div className="rounded-b-lg bg-grey-100 pt-2 text-center text-xl">
            <span className="pb-10 font-bold"> Event Name </span>
            <div className="pt-2 text-sm">
              <h1 className="font-bold">National Potato Chip Day </h1>
              <h2>Date: March 14th</h2>
              <p className="pb-3 pl-10 pr-10 pt-2">
                Lots of Potato Chip Eating, Potato merch, Baby Potatoes
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
