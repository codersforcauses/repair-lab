import Modal from "@/components/Modal";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";
import VolunteerCard from "@/components/Cards/volunteer-card";

type Props = {
  firstName?: string;
  lastName?: string;
  avatar?: string;
};

export default function AssigneeBadge({ firstName, lastName, avatar }: Props) {
  const [showAssigneeModal, setShowAssigneeModal] = useState(false);
  // an array of strings length 10
  const volunteers = Array.from({ length: 20 });

  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    setShowAssigneeModal(true);
  };

  // window.addEventListener("keydown", (ev) => {
  //   if (ev.key === "Escape") {
  //     setShowAssigneeModal(false);
  //   }
  //   ev.stopImmediatePropagation();
  //   ev.preventDefault();
  // });

  return (
    <>
      <div
        onClick={handleClick}
        className="rounded-lg bg-grey-200 p-2 hover:cursor-pointer"
      >
        <div>
          <div className="flex flex-row gap-2">
            <Image
              src={avatar || "/images/repair_lab_logo.jpg"}
              className="object-fit h-8 w-8 rounded-full"
              alt="avatar"
              width={100}
              height={100}
            />
            <div className="flex flex-col justify-center">
              <p className="text-xs font-bold">{firstName}</p>
              {!lastName ? "" : <p className="text-xs">{lastName}</p>}
            </div>
          </div>
        </div>
      </div>
      <Modal
        showModal={showAssigneeModal}
        setShowPopup={setShowAssigneeModal}
        height="h-3/4"
      >
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold">Assign Volunteer</h1>
        </div>
        <div className="w-full flex flex-row flex-wrap gap-4 justify-center">
          {volunteers.map((volunteer, index) => (
            <VolunteerCard key={index} />
          ))}
        </div>
      </Modal>
    </>
  );
}
