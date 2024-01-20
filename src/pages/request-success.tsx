import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";

import Button from "@/components/Button/index";
import NavBar from "@/components/NavBar";

import type { NextPageWithLayout } from "./_app";

// #TODO: Refactor this
const Success: NextPageWithLayout = () => {
  return (
    <div className="min-h-screen bg-lightAqua-100">
      <div className="relative flex flex-row place-content-center gap-x-12">
        <div>
          <Image src="/images/duck.png" alt="Duck" width={400} height={400} />
        </div>

        <div>
          <div className="relative flex text-center mb-3 mt-6 text-3xl font-bold text-grey-900">
            Thank you!
          </div>

          <ul className="mb-3 gap-y-4">
            <li>
              We have received your repair request, and you should receive a
              confirmation email shortly.
            </li>

            <li>
              We are currently experiencing high volumes of requests, and will
              aim to get back to you within 3-5 business days.
            </li>

            <li>We appreciate your patience! In the meantime...</li>
          </ul>

          <div className="relative flex text-center gap-x-8">
            <Link href="/repair-request">
              <Button radius="rounded-3xl"> Submit another request </Button>
            </Link>
            <Link href="/index">
              <Button radius="rounded-3xl"> Return to Homepage </Button>
            </Link>
          </div>
        </div>
      </div>
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
