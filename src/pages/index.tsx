import Image from "next/image";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { AiFillFacebook, AiFillInstagram, AiFillMail } from "react-icons/ai";

import Button from "@/components/Button/index";

// #TODO: Refactor this
export default function Home() {
  const { signOut } = useClerk();

  return (
    <div className="bg-lightAqua-50">
      <div className="relative h-96 w-full">
        <Image
          src="/images/blue_grid_vectorstock.jpg"
          alt="box of sewing equipment"
          fill={true}
          className="object-cover object-center"
        />
      </div>
      <div className="mb-16 bg-primary-600">
        <div className="mb-8 mt-6 text-center text-3xl font-black text-white">
          Hi, Welcome to Repair Lab!
        </div>
        <div className="flex flex-col pl-10 pr-10">
          <div className="flex flex-col justify-center">
            <div className="relative flex w-full justify-center text-white font-bold mb-4">
              When in doubt, don’t throw out!
            </div>
            <div className="relative flex w-full justify-center text-white mb-4">
              Bring it to the Repair Lab, a grassroots initiative to encourage
              and help Perth folks come up with new and creative ways to salvage
              perfectly usable things. Repair Lab gathers volunteers who work
              with you to assess and fix your broken items, and hopefully give
              you insight on how to repair other things around the house.
            </div>
          </div>
        </div>
        <div className="relative flex w-full justify-center">
          <svg height="50" width="1000">
            <line x1="20" y1="20" x2="1000" y2="20" stroke="white" />
          </svg>
        </div>
        <div className="relative flex w-full justify-center text-white mb-4">
          It’s a collaborative and learning experience, a little antidote to
          modern day throw-away mentality.
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-lightAqua-300 p-10">
        <span className="pb-6 text-2xl font-bold"> Upcoming Events </span>
        <div className="flex flex-col">
          <Image
            src="/images/jeans_repair.jpg"
            alt="A person repairing jeans"
            width={500}
            height={500}
            className="rounded-t-lg"
          />
          <div className="rounded-b-lg bg-grey-100 pt-2 text-center text-xl">
            <span className="pb-10 font-bold"> Event Name </span>
            <div className="pt-2 text-sm">
              <h1 className="font-bold"> Clothing Repair Workshop </h1>
              <h2>Date: March 14th</h2>
              <p className="pb-3 pl-10 pr-10 pt-2">
                Have any torned clothes? Bring them to our clothing repair!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16 h-auto bg-white p-3">
        <div className="pb-5 pt-12 text-center text-2xl font-bold">
          Submit item for Repair
        </div>
        <div className="h-30 mb-10 mt-5 pb-3 pl-10 pr-10">
          <Link href="/repair-request">
            <Button aria-label="button"> New Request </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-lightAqua-100">
        <span className="pb-6 text-2xl font-bold"> Contact Us </span>

        <div className="relative mt-1 flex w-full justify-center pl-10 pr-10">
          <Image
            src="/images/Repair_Lab_bikerepair.jpg"
            alt="bike repair"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>

        <ul className="tlex grid list-none justify-center gap-y-2 pb-10 pl-8 pr-8">
          <li className="mt-6">
            We are always on the lookout for more volunteers.
          </li>

          <li>
            Especially people with electrical knowledge are on high demand.
          </li>

          <li>
            But also people who can repair toys, bikes, furniture, clothing,
            jewellery, curtains, household items, garden tools, etc.
          </li>

          <li>
            Sometimes it is not only repair skills as well as care instructions.
            Maybe you can teach others how to keep your tools in mint condition,
            or how to crochet.
          </li>

          <li className="mb-4">
            If you are handy or have a good repair skills and eager to share
            them with your community, please contact us.
          </li>

          <li className="text-ml font-bold">
            Wilma & Flavia
            <div className="flex flex-row">
              <a href="https://www.facebook.com/RepairLabPerth/">
                <AiFillFacebook className="text-2xl" color="teal" />
              </a>

              <a href="https://www.instagram.com/repair_lab_perth/">
                <AiFillInstagram className="text-2xl" color="teal" />
              </a>

              <a href="mailto:repairlab.perth@gmail.com">
                <AiFillMail className="text-2xl" color="teal" />
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="m-10">
        <Button width="w-full" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
      <Link className="py-4" href="/events">
        <Button>Admin Dashboard</Button>
      </Link>
    </div>
  );
}
