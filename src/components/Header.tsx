import FormatDate from "@/components/utils/format-date";

export interface HeaderProps {
  name: string;
  createdBy: string;
  location: string;
  startDate: Date;
  endDate: Date;
}

export default function Header({ props }: { props: HeaderProps }) {
  return (
    <>
      <div className="header-component sticky top-0 z-50 flex justify-between gap-4 px-5 pb-8 pt-6 ">
        <div>
          <h1 className="text-2xl font-bold text-zinc-600">
            St Catherine’s <br />
            Repair Event
          </h1>
          <p className="mr-8 text-lg text-[#098D85]">
            Event Manager:{" "}
            <span className="text-zinc-800">{props.createdBy} </span>
          </p>
        </div>
        <div>
          <h1 className="text-right text-xl text-zinc-600">
            Location: {props.location} <br />
            Date: {FormatDate(String(props.startDate))}
            <br />
            Time: {String(props.startDate).slice(12, 16)}-
            {String(props.endDate).slice(12, 16)}
          </h1>
        </div>
      </div>
    </>
  );
}
