import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CiCirclePlus } from "react-icons/ci";

import VolunteerManageForm from "@/components/Forms/volunteer-manage-form";
import { HeaderProps } from "@/components/Header";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import Sidebar from "@/components/sidebar/index";

export default function Volunteers() {
  // const [volunteers, setVolunteers] = useState([]);
  const [headerValues, setHeaderValues] = useState<HeaderProps>(
    {} as HeaderProps
  );

  const {
    query: { id: eventId }
  } = useRouter();

  useEffect(() => {
    if (!eventId) return;

    fetch(`/api/event/${eventId}`)
      .then((res) => {
        if (!res.ok) {
          console.log("DATA NOT OK");
          console.log(res);
        }
        return res.json();
      })
      .then((event) => {
        console.log(event);
        // setVolunteers(event.volunteers); // TODO: This is actually an array of volunteer ids, so later we need to get the volunteer info from the clerk
        setHeaderValues({
          name: event.name,
          location: event.location,
          startDate: event.startDate,
          endDate: event.endDate,
          createdBy: event.createdBy // TODO: Later get name from clerk, given userID
        });
      })
      .catch((error) => {
        console.error("Error fetching data ):", error);
      });
  }, [eventId]);

  const [VolunteerModal, showVolunteerModal] = useState(false);

  function manageVolunteer() {
    showVolunteerModal(true);
  }
  return (
    <Sidebar>
      <main className="ml-80 min-h-screen w-full p-4">
        <Header props={headerValues} />
        <div className="container">
          <div className="w-auto p-4 text-2xl font-bold text-zinc-400">
            <div
              className="flex w-full items-center justify-center rounded-lg border bg-grey-100 p-4 shadow-md transition hover:-translate-y-1 hover:cursor-pointer hover:bg-secondary-50"
              role="presentation"
              onClick={manageVolunteer}
              onKeyDown={manageVolunteer}
            >
              <CiCirclePlus color="rgb(82 82 91)" size={100} />
            </div>
          </div>
          <div className="container mx-auto">
            <div className="flex justify-end"></div>
          </div>
          <div className="grid gap-4 p-4 lg:grid-cols-5 ">
            {/* {volunteers.map((item) => (
              <div key={item}>
                <AssigneeBadge firstName={item} />
              </div>
            ))}*/}
            {/* <div
              className="flex w-full items-center justify-center rounded-lg border bg-grey-100 p-4 shadow-md transition hover:-translate-y-1 hover:cursor-pointer hover:bg-secondary-50"
              role="presentation"
            >
              <CiCirclePlus color="rgb(82 82 91)" size={100} />
          </div> */}
          </div>
          <Modal showModal={VolunteerModal} setShowPopup={showVolunteerModal}>
            {" "}
            <div className="text-center">
              <h1 className="text-xl font-bold">Add Volunteers</h1>
              <div>
                <VolunteerManageForm />
              </div>
            </div>
          </Modal>
          <span className="w-full border-b-[1px] border-gray-200 p-2"></span>
        </div>
      </main>
    </Sidebar>
  );
}
