import AssigneeBade from "@/components/Cards/assignee-badge";
import StatusPill from "@/components/Cards/status-pill";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  status?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
};

export default function Card({
  title,
  description,
  image,
  status,
  firstName,
  lastName,
  avatar
}: Props) {
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
        <img src={image} alt="" className="object-fit max-h-32 w-full" />
      </div>
      <div className="p-2">
        <div className="mb-1 flex flex-row items-start justify-between">
          <h3 className="h-14 w-1/2 self-start overflow-hidden text-ellipsis text-xl font-bold">
            {title}
          </h3>
          <div className="">
            <AssigneeBade
              firstName={firstName}
              lastName={lastName}
              avatar={avatar}
            />
          </div>
        </div>
        <div>
          <p className="mb-3 h-32 overflow-y-scroll text-ellipsis text-sm font-light">
            {description}
          </p>
        </div>
        <div className="m-2 mt-0 flex justify-end">
          <StatusPill status={status} />
        </div>
      </div>
    </div>
  );
}
