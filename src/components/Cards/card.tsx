import AssigneeBade from "@/components/Cards/assignee-badge";
import StatusPill from "@/components/Cards/status-pill";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  status?: string;
};

export default function Card({ title, description, image, status }: Props) {
  function handleClick() {
    alert("Something happens");
  }

  const cardStyle = `w-36 `;
  return (
    <div
      onClick={handleClick}
      onKeyDown={handleClick}
      role="presentation"
      className="w-72 flex-col overflow-clip rounded-lg bg-slate-200 shadow-2xl transition hover:-translate-y-0.5 hover:cursor-pointer hover:bg-slate-100"
    >
      <div className="flex justify-center">
        <img src={image} alt="" className="object-fit max-h-32 w-full" />
      </div>
      <div className="p-2">
        <div className="mb-1 flex flex-row items-center justify-between">
          <h3 className=" t self-start text-xl font-bold">{title}</h3>
          <div className="">
            <AssigneeBade firstName="Bambang" lastName="Johnson" avatar="yes" />
          </div>
        </div>
        <div className="mb-3 h-32 overflow-auto text-sm font-light">
          <p>{description}</p>
        </div>
        <div className="m-2 mt-0 flex justify-end">
          <StatusPill status={status} />
        </div>
      </div>
    </div>
  );
}
