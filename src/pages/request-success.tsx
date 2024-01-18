import Image from "next/image";
import type { ReactElement } from "react";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { AiFillFacebook, AiFillInstagram, AiFillMail } from "react-icons/ai";
import type { NextPageWithLayout } from "./_app";
import Button from "@/components/Button/index";
import NavBar from "@/components/NavBar";

// #TODO: Refactor this
const Success: NextPageWithLayout = () => {
  return (
    <div className="relative h-44 w-full">
      <Image
        src="/images/sewing_box.jpg"
        alt="box of sewing equipment"
        fill={true}
        className="object-cover object-center"
      />
    </div>
  );

  Success.getLayout = function getLayout(page: ReactElement) {
    return (
      <>
        <NavBar />
        {page}
      </>
    );
  };
};
export default Success;
