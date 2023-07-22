import { useEffect, useState } from "react";
import Image from "next/image";

type RepairRequest = {
  id: string;
  itemBrand: string;
  item: string;
  description: string;
};

export default function RepairReqList() {
  const [repairReqList, setRepairReqList] = useState([] as RepairRequest[]);

  async function fetchData() {
    const response = await fetch(`/api/repair-request`, {
      method: "GET"
    });
    const data = await response.json();
    setRepairReqList(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

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

      {/* get the request list from the database and display it here*/}

      {repairReqList.map((repairReq) => (
        <div className="border bg-primary-400" key={repairReq.id}>
          <div className="flex flex-col items-center">
            <h1>{repairReq.itemBrand}</h1>
            <p>{repairReq.item}</p>

            <p>{repairReq.description}</p>
          </div>
        </div>
      ))}
    </main>
  );
}
