import { SyntheticEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Circle from "@/components/Cards/circle";
import VolunteerCard from "@/components/Cards/volunteer-card";
import Modal from "@/components/Modal";
import { useRepairers } from "@/hooks/events";

type Props = {
  firstName?: string;
  lastName?: string;
  avatar?: string;
};

export default function AssigneeBadge({ firstName, lastName, avatar }: Props) {
  const [showAssigneeModal, setShowAssigneeModal] = useState(false);
  const {
    query: { id: eventId }
  } = useRouter();
  const { data: repairers } = useRepairers(eventId as string);

  // const repairers = [
  //   { userId: "William Miller" },
  //   { userId: "Linda Taylor" },
  //   { userId: "Michael Jones" },
  //   { userId: "Michael Taylor" },
  //   { userId: "Elizabeth Wilson" },
  //   { userId: "William Wilson" },
  //   { userId: "Robert Smith" },
  //   { userId: "Mary Taylor" },
  //   { userId: "Patricia Jones" },
  //   { userId: "William Wilson" }
  // ];

  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    setShowAssigneeModal(true);
  };

  return (
    <>
      <div
        onClick={handleClick}
        onKeyDown={handleClick}
        role="button"
        tabIndex={0}
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
        <div className="h-full flex flex-col gap-4 text-center">
          <h1 className="text-xl font-bold">Assign Volunteer</h1>
          <div className="flex space-x-2 items-center justify-center">
            <Circle />
            <p className="font-medium">Task Assigned</p>
          </div>
          <div className="overflow-x-hidden mt-2 flex flex-row flex-wrap gap-5 justify-center overflow-scroll">
            {repairers &&
              repairers.map((repairer, index) => (
                <VolunteerCard userId={repairer.userId} key={index} />
              ))}
            {/* userId = Staff.id? */}
          </div>
        </div>
      </Modal>
    </>
  );
}
