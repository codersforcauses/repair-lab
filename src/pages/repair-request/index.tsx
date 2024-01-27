// Page for submitting a repair request
import Image from "next/image";
import RepairRequestForm from "@/components/Forms/create-repair-request";
import { NextPageWithLayout } from "@/pages/_app";
import NavBar from "@/components/NavBar";

const RepairRequest: NextPageWithLayout = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex w-screen flex-col justify-center gap-4 md:w-3/6 lg:w-4/12">
        {/* Logo of Repair Lab, which links to the main website. */}

        <picture className="flex justify-center">
          <a href="https://repairlab.myfreesites.net/" target="_blank">
            <Image
              src="/images/repair_lab_logo.jpg"
              alt="Repair Labs Logo"
              width={80}
              height={80}
            />
          </a>
        </picture>

        {/* Heading of the Page */}

        <h1 className="flex justify-center text-xl font-bold">
          {" "}
          Submit a Repair Request
        </h1>
        <RepairRequestForm />
      </div>
    </div>
  );
};

RepairRequest.getLayout = function getLayout(page) {
  return (
    <>
      <NavBar />
      {page}
    </>
  );
};

export default RepairRequest;