import React from "react";

export interface HeaderProps {
  name: string;
  createdBy: string;
  location :string;
  startDate: Date;
  endDate: Date;
}

export default function Header( {props}: {props: HeaderProps}) {
  function formatDate(dateString: string): string {
    const actualDate = new Date(dateString);
    const day = actualDate.getDate().toString().padStart(2, "0");
    const month = (actualDate.getMonth() + 1).toString().padStart(2, "0");
    const year = actualDate.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  return (
    <>
      <div className="flex justify-between gap-4 px-5 pb-8 pt-12 ">
        <div>
          <h1 className="text-2xl font-bold text-zinc-600">
            St Catherine’s <br />
            Repair Event
          </h1>
          <p className="mr-8 text-lg text-[#098D85]">
            Event Manager: <span className="text-zinc-800">{props.createdBy} </span>
          </p>
        </div>
        <div>
          <h1 className="text-right text-xl text-zinc-600">
            Location: {props.location} <br />
          Date: {formatDate(String(props.startDate))}
            <br />
            Time: {String(props.startDate).slice(12,16)}-{String(props.endDate).slice(12,16)}
          </h1>
        </div>
      </div>
      <hr />
    </>
  );
}
