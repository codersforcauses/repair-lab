import Image from "next/image";
import type { ReactElement } from "react";
import Link from "next/link";
import type { NextPageWithLayout } from "./_app";
import Button from "@/components/Button/index";
import NavBar from "@/components/NavBar";

// #TODO: Refactor this
const Success: NextPageWithLayout = () => {
  return (
    <div className="relative">
      <div className="mb-8 mt-6 text-center text-3xl font-bold text-grey-900">
        Thank you!
      </div>

      <Link href="/repair-request">
        <Button width="w-1/4"> Submit another request </Button>
      </Link>
      <Link href="/index">
        <Button width="w-1/4"> Return to Homepage </Button>
      </Link>
    </div>
  );
};

Success.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <NavBar />
      {page}
    </>
  );
};
export default Success;
