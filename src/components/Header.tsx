import React from "react";

export default function Header() {
  return (
    <>
      <div className="flex justify-between gap-4 px-5 pb-8 pt-12 ">
        <div>
          <h1 className="text-2xl font-bold text-zinc-600">
            St Catherine’s <br />
            Repair Event
          </h1>
          <p className="mr-8 text-lg text-[#098D85]">
            Event Manager: <span className="text-zinc-800">Dan Hil </span>
          </p>
        </div>
        <div>
          <h1 className="text-right text-xl text-zinc-600">
            Location: 123 Crawley Road, Crawley <br />
            Date: 12/01/23
            <br />
            Time: 10:00 - 12:00
          </h1>
        </div>
      </div>
      <hr />
    </>
  );
}
