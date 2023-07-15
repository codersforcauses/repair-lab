import Image from "next/image";

import Card from "@/components/Cards/card";



export default function RepairReqList() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      {/* Logo of Repair Lab, which links to the main website. */}
      <picture>
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
      <h1 className="text-xl font-bold"> Repair Request List</h1>
      
      {/* TODO */}
      <Card title = "title" 
            description = "description" 
      />

    </main>
  );
}


