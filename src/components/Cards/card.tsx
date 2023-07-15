import Image from 'next/image'

import AssigneeBade from "@/components/Cards/assignee-badge";
import StatusPill from "@/components/Cards/status-pill";

export type CardProps = {
  title?: string;
  description?: string;
  image?: string;
  status?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
};

export default function Card({
  props
}: {
  props: CardProps;
}) {
  function handleClick() {
    alert("Something happens");
  }

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleClick}
      role="presentation"
      className="col-span-1 w-72 flex-col overflow-hidden rounded-lg bg-slate-200 shadow-2xl transition hover:-translate-y-0.5 hover:cursor-pointer hover:bg-slate-100"
    >
      <div className="flex justify-center">
        <Image src={props.image || ""} alt="hello" className="object-fit max-h-32 w-full" width={100} height={100} />
      </div>
      <div className="p-2">
        <div className="mb-1 flex flex-row items-start justify-between">
          <h3 className="h-14 w-1/2 self-start overflow-hidden text-ellipsis text-xl font-bold">
            Repair ID:{props.title}
          </h3>
          <div className="">
            <AssigneeBade
              firstName={props.firstName}
              lastName={props.lastName}
              avatar={props.avatar}
            />
          </div>
        </div>
        <div>
          <p className="mb-3 h-32 overflow-y-scroll text-ellipsis text-sm font-light">
            {props.description}
          </p>
        </div>
        <div className="m-2 mt-0 flex justify-end">
          <StatusPill status={props.status} />
        </div>
      </div>
    </div>
  );
}
