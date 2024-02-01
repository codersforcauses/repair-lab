import { useState } from "react";
import Image from "next/image";

import AssigneeBadge from "@/components/Cards/assignee-badge";
import StatusPill from "@/components/Cards/status-pill";
import ImageCarousel from "@/components/Carousel/image-carousel";
import Modal from "@/components/Modal/index";
import { RepairRequestResponse } from "@/types";

export type CardProps = {
  title?: string;
  description?: string;
  image?: string;
  status?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  handleClick?: () => void;
  repairRequestProps: RepairRequestResponse;
};

export default function Card({ props }: { props: CardProps }) {
  function handleClick() {
    setShowModal(true);
  }

  const [showModal, setShowModal] = useState(false);

  return (
    <div
      onClick={props.handleClick ? props.handleClick : handleClick}
      onKeyDown={props.handleClick ? props.handleClick : handleClick}
      role="presentation"
      className="group col-span-1 max-w-xs flex-col overflow-hidden rounded-lg bg-grey-100 shadow-md transition hover:-translate-y-0.5 hover:cursor-pointer hover:bg-grey-50"
    >
      <Modal setShowPopup={setShowModal} showModal={showModal}>
        <div className="text-center">
          <h1 className="text-xl font-bold">Repair ID:</h1>
          <h2 className="text-l font-bold">
            {props.title} <StatusPill status={props.status} />
          </h2>
          <div className="text-left mb-2">
            <h3 className="text-xl font-bold text-left">Details:</h3>
            <ImageCarousel images={props.repairRequestProps.images} />
            <div className="flex flex-row mt-2">
              <div className="border-r-2 pr-2 mr-2">
                {" "}
                <h4 className="font-bold">Brand</h4>
                <p className="mb-3">
                  {props.repairRequestProps.itemBrand
                    ? props.repairRequestProps.itemBrand
                    : "-"}
                </p>
                <h4 className="font-bold">Material</h4>
                <p className="mb-3">
                  {props.repairRequestProps.itemMaterial
                    ? props.repairRequestProps.itemMaterial
                    : "-"}
                </p>
                <h4 className="font-bold">Hours Worked</h4>
                {props.repairRequestProps.hoursWorked
                  ? props.repairRequestProps.hoursWorked
                  : "-"}
              </div>
              <div className="w-8/12">
                <h4 className="font-bold">Description</h4>
                <p className="mb-3">
                  {props.repairRequestProps.description
                    ? props.repairRequestProps.description
                    : "-"}
                </p>
                <h4 className="font-bold">Repair Comment</h4>
                <p className="mb-3">
                  {props.repairRequestProps.repairComment
                    ? props.repairRequestProps.repairComment
                    : "-"}
                </p>
                <h4 className="font-bold">Parts Needed</h4>
                <p className="mb-3">
                  {props.repairRequestProps.spareParts
                    ? props.repairRequestProps.spareParts
                    : "-"}
                </p>
              </div>
            </div>
            <div className="my-2">
              <h4 className="font-bold">Assigned to</h4>
              {`${props.repairRequestProps.assignedTo?.firstName} ${props.repairRequestProps.assignedTo?.lastName}` ??
                "-"}
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex justify-center">
        <Image
          src={props.image || "/images/broken-clock-sad.jpg"}
          alt={"img for " + props.title}
          className="object-fit max-h-32 w-full"
          width={100}
          height={100}
        />
      </div>
      <div className="p-2">
        <div className="flex flex-row items-start justify-between">
          <h3 className="h-18 flex w-full flex-col  self-start text-xl font-bold">
            Repair ID:
          </h3>

          <div className="pr-2">
            <StatusPill status={props.status} />
          </div>
        </div>
        <p className="mb-3 w-full text-sm font-semibold">{props.title}</p>
        <div>
          <p className="mb-3 h-32 overflow-y-hidden text-ellipsis text-sm font-light">
            {props.description}
          </p>
        </div>
        <div className="m-2 mt-0 flex justify-end">
          <AssigneeBadge
            firstName={props.firstName}
            lastName={props.lastName}
            avatar={props.avatar}
          />
        </div>
      </div>
    </div>
  );
}
