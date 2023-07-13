import ThumbnailRepairRequest from "@/components/Thumbnail/repair-request-image";

export interface RepairRequestCardProps {
  id: string;
  description: string;
  status: string;
  itemType: string;
  brand: string;
  volunteer: string;
}

export default function RepairRequestCard({
  props
}: {
  props: RepairRequestCardProps;
}) {
  return (
    <div className="col-span-1 grid w-full  rounded-3xl border bg-zinc-200 ">
      <ThumbnailRepairRequest props={props.id} />
      <div className="grid w-full p-4 leading-8">
        <p className="text-md font-bold">{props.description}</p>
        <p className="text-lg">
          Status:
          <span className="rounded-lg bg-green-200 p-1">{props.status}</span>
        </p>
        <p className="text-lg">
          Item type: <span>{props.itemType}</span>
        </p>
        <p className="text-lg">
          Brand: <span>{props.brand}</span>
        </p>
        <p className="text-lg">
          Volunteer: <span className="font-bold">{props.volunteer}</span>
        </p>
      </div>
    </div>
  );
}
