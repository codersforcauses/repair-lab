import Image from "next/image";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import type { ReactElement } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import Button from "@/components/Button/index";
import NavBar from "@/components/NavBar";

import type { NextPageWithLayout } from "./_app";
import BigGreenCurve from "../SVGs/BigGreenCurve";
import Drill from "../SVGs/drill";
import Gear from "../SVGs/Gear";
import Wrench from "../SVGs/Wrench";
// #TODO: Refactor this
const Home: NextPageWithLayout = () => {
  return (
    <div>
      <div
        id="grid-bg-container"
        className="relative w-full h-[25rem] sm:h-[30rem] md:h-[35rem] lg:h-[46rem] border-green-500 border-0"
      >
        <Image
          src="/images/big_hero_bg.jpg"
          alt="big hero bg"
          fill={true}
          className="object-cover object-center h-full z-0"
        />
        <a href="https://www.vectorstock.com/royalty-free-vector/realistic-template-notepad-blank-cover-design-vector-23930574">
          Vector image by VectorStock / Elnur
        </a>
        <div className="relative border-1 border-black border-0 h-3/4 w-5/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3">
          <div>
            <Image
              src="/images/circle_images_big.png"
              alt="circle images"
              fill={true}
              className="object-contain object-center"
            />
          </div>
        </div>
        <div className="big green curve absolute bottom-0 w-full">
          <BigGreenCurve />
        </div>
      </div>

      <section
        id="big-green-area"
        className="relative w-full min-h-[40rem] sm:min-h-[50rem] border-blue-500 border-0 bg-primary-600 bottom-[1px]"
      >
        <div id="drill" className="absolute z-10 right-[7%] top-[18%] w-[10%]">
          <Drill />
        </div>
        <div
          id="wrench"
          className="absolute z-10 w-[10%] bottom-[10%] left-[2%]"
        >
          <Wrench />
        </div>

        <div
          id="gear"
          className="absolute z-10 -bottom-[40%] lg:-bottom-[50%] md:-bottom-[50%] md:w-1/2 right-[2%] lg:w-[40%] w-2/3 lg:block hidden"
        >
          <Gear />
        </div>
        <div className="text-area flex flex-col justify-center items-center text-center border-red-500 border-0">
          <div className="xl:w-1/3 lg:w-1/2 w-full md:p-0 pl-2 pr-4 flex justify-center">
            <h1 className="relative z-20 pb-8 pt-6 leading-tight text-6xl font-black text-white">
              Hi, Welcome to Repair Lab!
            </h1>
          </div>
          <h3 className="relative z-10 w-full text-white font-bold sm:pb-8 pb-16 text-xl italic">
            When in doubt, don’t throw out!
          </h3>
          <p className="relative z-20 w-2/3 text-white pb-8 text-lg">
            Bring it to Repair Lab, a grassroots initiative to encourage and
            help Perth folks come up with new and creative ways to salvage
            perfectly usable things. Repair Lab gathers volunteers who work with
            you to assess and fix your broken items, and hopefully give you
            insight on how to repair other things around the house.
          </p>
          <div className="hidden sm:block">
            <div className="relative z-15 sm:flex w-full justify-center hidden">
              <svg height="50" width="600">
                <line x1="20" y1="20" x2="10000" y2="20" stroke="white" />
              </svg>
            </div>
            <div className="sm:flex justify-center hidden">
              <h3 className="lg:w-1/3 sm:w-2/3 w-full sm:pr-0 sm:pl-0 pr-5 pl-5 text-white pb-20 font-medium text-3xl ">
                It’s a collaborative and learning experience, a little antidote
                to modern day throw-away mentality.
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="white text area pt-[1rem] relative z-10 border-green-500 border-0 sm:min-h-[55rem] min-h-[40rem]">
        <Image
          src="/images/white_area_bg_v5.jpg"
          alt="white area bg"
          fill={true}
          className="object-cover object-center h-full z-0"
        />
        <div className="relative lg:grid lg:grid-cols-2 lg:grid-rows-2 grid-cols-1 grid-rows-2 border-red-500 border-0 sm:min-h-[55rem] min-h-[20rem] w-full">
          <div className="flex flex-col row-start-1 row-end-1 col-start-1 col-end-1 border-blue-500 border-0 justify-center items-center">
            <h2 className="relative text-5xl font-black text-primary-600 z-20 text-center mb-10">
              Learn new skills
            </h2>
            <p className="relative z-20 text-xl font-medium text-center lg:w-3/4 w-2/3 mb-14">
              Want to learn how to repair your stuff? Or how to take care of it
              so it will last longer? Come and join us at Repair Lab, where
              volunteers will assist you in gaining these new skills!
            </p>
          </div>
          <div className="col-start-1 col-end-1 row-start-2 row-end-2 border-green-500 border-0">
            <div className="relative lg:w-full xl:ml-10 p-2 flex justify-center bottom-[10%] xl:right-[10%]">
              <Image
                src="/images/Repair_Lab_bikerepair.jpg"
                alt="bike repair"
                width={500}
                height={400}
                className="rounded-2xl shadow w-2/3 lg:w-[90%] xl:w-3/4 2xl:w-[60%]"
              />
            </div>
          </div>
          <div className="border-yellow-500 border-0 lg:flex flex-col lg:visible hidden">
            <div className="sewing-image relative z-20 w-full flex justify-center items-center ml-2 top-[8%] xl:right-2 right-0">
              <Image
                src="/images/Repair_Lab_sewing.jpg"
                alt="sewing image"
                width={500}
                height={400}
                className="rounded-2xl shadow-md"
              />
            </div>
          </div>
          <div className="border-pink-500 border-0 flex flex-col justify-center items-center ">
            <h2 className=" relative z-20 text-center text-5xl font-black text-primary-600 mb-10">
              Reduce Waste
            </h2>
            <p className="relative text-center text-xl font-medium lg:w-3/4 w-2/3 mb-16">
              If you think that we are all creating too much waste by discarding
              everything without even trying to repair, join us at Repair Lab!
              Meet like minded locals and treasure your stuff.
            </p>
          </div>
          <div className="border-yellow-500 border-0 flex flex-col lg:hidden visible">
            <div className="sewing-image relative z-20 w-full flex justify-center items-center ml-2 bottom-8 xl:right-0 right-4">
              <Image
                src="/images/Repair_Lab_sewing.jpg"
                alt="sewing image"
                width={500}
                height={400}
                className="rounded-2xl shadow-md w-2/3"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center bg-darkAqua-600 p-10">
        <span className="pb-6 text-5xl font-black tracking-wide text-white text-center">
          {" "}
          UPCOMING EVENTS{" "}
        </span>
        <div className="flex flex-col shadow-lg shadow-darkAqua-700">
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
      </section>

      <section className="min-h-[25rem] w-full bg-white flex flex-col justify-center">
        <div className="pb-6 text-center text-5xl font-extrabold text-primary-600">
          Submit item for Repair
        </div>
        <div className="flex justify-center items-center">
          <div className="h-30 w-3/4 mb-[5%] font-medium">
            <Link href="/repair-request">
              <Button aria-label="button" className="w-1/3">
                {" "}
                New Request{" "}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grey area relative bg-[#56727E] min-h-[18rem] w-full border-yellow-500 border-0 grid grid-cols-2">
        <div className="flex justify-center items-center">
          <div className="oval relative w-[70%] h-44 rounded-[50%] bg-primary-500 flex items-center justify-center col-span-1">
            <h5 className="absolute z-10 text-white text-center text-2xl lg:text-white font-extrabold md:text-yellow-300 sm:text-red-300 mx-4">
              Click on the icons to go to our socials!
            </h5>
          </div>
        </div>
        <div className="col-span-1 border-red-500 border-0 m-auto w-3/4">
          <div className=" border-blue-500 border-0 ">
            <div className="flex justify-center w-full">
              <p className="text-white text-bold sm:p-4 text-xl underline text-center break-all w-full">
                <a href="mailto:repairlab.perth@gmail.com">
                  Email: repairlab.perth@gmail.com
                </a>
              </p>
            </div>
            <div className="flex justify-evenly">
              <a
                href="https://www.instagram.com/repair_lab_perth"
                target="_blank"
              >
                <FaInstagram className="fill-white w-[6rem] h-[6rem]" />
              </a>
              <a
                href="https://www.facebook.com/RepairLabPerth/"
                target="_blank"
              >
                <FaFacebook className="fill-white w-[6rem] h-[6rem] " />
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="copyright bg-[#56727E] w-full h-10 text-white text-center">
        Copyright © All Rights Reserved
      </div>
    </div>
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
