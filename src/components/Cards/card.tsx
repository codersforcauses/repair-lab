import StatusPill from "@/components/Cards/status-pill";

type Props = {
  title?: string;
  description?: string;
  image?: string;
};

export default function Card({ title, description, image }: Props) {
  const cardStyle = `w-36 `;
  return (
    <div className="w-56 flex-col rounded-lg bg-slate-200 shadow-2xl">
      <div className="flex justify-center">
        <img src={image} alt="" width="125px" height="125px" />
      </div>
      <div className="p-2">
        <div className="mb-1 text-xl font-bold">
          <h3>{title}</h3>
        </div>
        <div className="mb-3 h-32 overflow-auto text-sm font-light">
          <p>{description}</p>
        </div>
        <div className="mb-1 flex justify-end">
          <StatusPill />
        </div>
      </div>
    </div>
  );
}
