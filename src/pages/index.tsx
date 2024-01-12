import Image from "next/image";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import type { ReactElement } from "react";
import { AiFillFacebook, AiFillInstagram, AiFillMail } from "react-icons/ai";

import Button from "@/components/Button/index";
import NavBar from "@/components/NavBar";

import type { NextPageWithLayout } from "./_app";

// #TODO: Refactor this
const Home: NextPageWithLayout = () => {
  const { signOut } = useClerk();

  return (
    <>
      {/* <svg width="100" height="50" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 25 A 25 25 0 1 1 50 25 Z" fill="#098D85" />
      </svg> */}
      <div className="bg-lightAqua-50">
        <div className="relative h-96 w-full">
          <Image
            src="/images/blue_grid_vectorstock.jpg"
            alt="box of sewing equipment"
            fill={true}
            className="object-cover object-center"
          />
        </div>
        <div className="relative h-80 w-full">
          <Image
            src="/images/blue_grid_vectorstock.jpg"
            alt="box of sewing equipment"
            fill={true}
            className="object-cover object-center"
          />
        </div>
        <div className="flex w-full justify-center">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1043 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#098D85"
          >
            <g filter="url(#filter0_d_1995_115)">
              <path
                d="M0 59C407.838 7.95618 631.771 6.05254 1043 59H0Z"
                fill="#098D85"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_1995_115"
                x="0"
                y="0"
                width="1043"
                height=""
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="-10" />
                <feGaussianBlur stdDeviation="5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.301961 0 0 0 0 0.576471 0 0 0 0 0.560784 0 0 0 0.3 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1995_115"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1995_115"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <div className="bg-primary-600">
          <div className="text-center">
            <h1 className="pb-8 pt-6 inline-block w-1/4 leading-tight text-5xl font-black text-white">
              Hi, Welcome to Repair Lab!
            </h1>
          </div>
          <h3 className="relative flex w-full justify-center text-white font-bold pb-8 text-xl">
            When in doubt, don’t throw out!
          </h3>
          <div className="text-center">
            <p className="relative inline-block w-2/3 text-white pb-8 pl-28 pr-28 text-lg">
              Bring it to the Repair Lab, a grassroots initiative to encourage
              and help Perth folks come up with new and creative ways to salvage
              perfectly usable things. Repair Lab gathers volunteers who work
              with you to assess and fix your broken items, and hopefully give
              you insight on how to repair other things around the house.
            </p>
          </div>
          <div className="relative flex w-full justify-center">
            <svg height="50" width="500">
              <line x1="20" y1="20" x2="1000" y2="20" stroke="white" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="relative inline-block w-1/4 text-white pb-20 font-semibold italic text-2xl">
              It’s a collaborative and learning experience, a little antidote to
              modern day throw-away mentality.
            </h3>
          </div>
        </div>

        <div className="white-text-area">
          <div className="flex flex-col">
            <div className="justify-start">
              <h2 className="pb-8 pt-20 ml-64 text-left text-5xl font-black text-primary-600">
                Learn new skills
              </h2>
            </div>
            <div className="justify-start text-center h-4 w-1/2">
              <p className="relative ml-44 mr-0 mb-0 pt-2 text-xl">
                Want to learn how to repair your stuff? Or how to take care of
                it so it will last longer? Come and join us at Repair Lab, where
                volunteers will assist you in gaining these new skills!
              </p>
            </div>

            <div className="sewing-image relative flex w-full justify-end right-72 p-0 bottom-20">
              <Image
                src="/images/Repair_Lab_sewing.jpg"
                alt="bike repair"
                width={500}
                height={400}
                className="rounded-2xl"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <h2 className=" relative pb-4 pt-0 mr-96 right-32 text-right text-5xl font-black text-primary-600 bottom-4">
              Reduce Waste
            </h2>
          </div>
          <div className="flex justify-end text-center">
            <p className="relative ml-0 mr-20 mb-0 right-60 pt-4 text-xl bottom-2 w-1/3">
              If you think that we are all creating too much waste by discarding
              of everything without even trying to repair, join us at Repair
              Lab! Meet like minded locals and treasure your stuff.
            </p>
          </div>
          <div className="relative pt-1 flex w-full justify-start pl-48 pb-0 mb-0 bottom-64">
            <Image
              src="/images/Repair_Lab_bikerepair.jpg"
              alt="bike repair"
              width={500}
              height={400}
              className="rounded-2xl"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-darkAqua-600 p-10 bottom-0">
          <span className="pb-6 text-4xl font-extrabold text-white ">
            {" "}
            UPCOMING EVENTS{" "}
          </span>
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

        <div className="mb-16 h-auto  p-3">
          <div className="pb-5 pt-12 text-center text-4xl font-extrabold text-primary-600">
            Submit item for Repair
          </div>
          <div className="h-30 mb-10 mt-5 pb-3 pl-10 pr-10 ">
            <Link href="/repair-request">
              <Button aria-label="button" className="">
                {" "}
                New Request{" "}
              </Button>
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
              Sometimes it is not only repair skills as well as care
              instructions. Maybe you can teach others how to keep your tools in
              mint condition, or how to crochet.
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
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <NavBar />
      {page}
    </>
  );
};

export default Home;
