import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";

import Button from "@/components/Button/index";
import NavBar from "@/components/NavBar";

import type { NextPageWithLayout } from "./_app";

// #TODO: Refactor this
const Success: NextPageWithLayout = () => {
  return (
    <div className="min-h-screen min-w-screen bg-lightAqua-100 flex justify-center">
      <div className="relative flex h-screen items-center justify-center gap-x-12">
        <div className="w-1/2">
          <div className="relative flex justify-center">
            <Image src="/images/duck.png" alt="Duck" width={200} height={200} />
          </div>

          <div className="relative text-center mb-8 mt-6 text-3xl font-bold text-grey-900">
            Thank you!
          </div>

          <div className="text-slate-500 text-xl text-center mb-8 gap-y-4 leading-relaxed">
            We have received your repair request, and you should receive a
            confirmation email shortly. We are currently experiencing high
            volumes of requests, and will aim to get back to you within 3-5
            business days. We appreciate your patience! In the meantime...
          </div>

          <div className="relative flex text-center gap-x-8">
            <div className="w-1/2">
              <Link href="/repair-request">
                <Button
                  aria-label="Submit another request"
                  radius="rounded-3xl"
                >
                  {" "}
                  Submit another request{" "}
                </Button>
              </Link>
            </div>
            <div className="w-1/2">
              <Link href="/index">
                <Button aria-label="Return to Homepage" radius="rounded-3xl">
                  {" "}
                  Return to Homepage{" "}
                </Button>
              </Link>
            </div>
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
