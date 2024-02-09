import Image from "next/image";
import Link from "next/link";
<<<<<<< HEAD
import { useRouter } from "next/router";
=======
import { useParams } from "next/navigation";
>>>>>>> 4cdba3c32d30f3e21b43838fe9b0e185b85b206b
import type { ReactElement } from "react";

import Button from "@/components/Button/index";
import NavBar from "@/components/NavBar";

import type { NextPageWithLayout } from "../_app";

// #TODO: Refactor this
const Success: NextPageWithLayout = () => {
<<<<<<< HEAD
  const params = useRouter();
=======
  const params = useParams();
>>>>>>> 4cdba3c32d30f3e21b43838fe9b0e185b85b206b

  return (
    <div className="fixed min-h-screen min-w-screen flex flex-grow justify-center">
      <div className="relative flex h-screen items-center justify-center gap-x-12">
        <div className="w-1/2">
          <div className="relative flex justify-center mt-8">
            <Image
              src="/images/submission-success.svg"
              alt="Man with giant pencil in front of computer"
              width={300}
              height={250}
            />
          </div>

          <h1 className="relative text-center mb-6 mt-8 text-3xl font-bold text-grey-900">
            Thank you!
          </h1>

          <h2 className="relative text-center mb-3 mt-5 text-xl font-bold text-grey-500">
<<<<<<< HEAD
            Repair Request ID: {params.query.id}
=======
            Repair Request ID: {params.id}
>>>>>>> 4cdba3c32d30f3e21b43838fe9b0e185b85b206b
          </h2>

          <p className="text-slate-500 text-xl text-center mb-8 gap-y-4 leading-relaxed">
            We have received your repair request, and you should receive a
            confirmation email shortly. We are currently experiencing high
            volumes of requests, and will aim to get back to you within 3-5
            business days. We appreciate your patience! In the meantime...
          </p>

          <div className="relative flex text-center gap-x-8">
            <div className="w-1/2">
              <Link href="/repair-request">
                <Button
                  aria-label="Submit another request"
                  radius="rounded-3xl"
                >
                  {" "}
                  Submit Another Request{" "}
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
      <div className="min-h-screen flex flex-col">
        <NavBar />
        {page}
      </div>
    </>
  );
};

export default Success;
