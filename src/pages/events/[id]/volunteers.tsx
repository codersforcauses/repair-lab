import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import AssigneeBadge from "@/components/Cards/assignee-badge";
import VolunteerManageForm from "@/components/Forms/volunteer-manage-form"
import { HeaderProps } from "@/components/Header";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import Sidebar from "@/components/sidebar/index";

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [headerValues, setHeaderValues] = useState<HeaderProps>(
    {} as HeaderProps
  );

  const {
    query: { id: eventId }
  } = useRouter();

  useEffect(() => {
    if (!eventId) return;

    fetch(`/api/event/${eventId}`)
      .then((res) => res.json())
      .then((event) => {
        setVolunteers(event.volunteers); // TODO: This is actually an array of volunteer ids, so later we need to get the volunteer info from the clerk
        setHeaderValues({
          name: event.name,
          location: event.location,
          startDate: event.startDate,
          endDate: event.endDate,
          createdBy: event.createdBy // TODO: Later get name from clerk, given userID
        });
      });
  }, [eventId]);

  const [VolunteerModal, showVolunteerModal] = useState(false);

  function manageVolunteer(){
    showVolunteerModal(true);
  }
  return (
    <Sidebar>
      <main className="ml-80 min-h-screen w-full p-4">
        <Header props={headerValues} />
        <div className="container">
          <div className="flex flex-row w-auto p-4 text-2xl font-bold text-zinc-400 content-center justify-between">
            <span>Volunteers ({volunteers.length})</span>
            <div
              className="flex rounded-lg border bg-primary-500 p-2 w-1/4 shadow-md transition hover:cursor-pointer hover:bg-primary-300 text-sm text-white justify-center"
              role="presentation"
              onClick={manageVolunteer}
              onKeyDown={manageVolunteer}
            >
              Add Volunteers
            </div>
          </div>
          <div className="container mx-auto">
            <div className="flex justify-end"></div>
          </div>
          <div className="grid gap-4 p-4 lg:grid-cols-5 ">
            {volunteers.map((item) => (
              <div key={item}>
                <AssigneeBadge firstName={item} />
              </div>
            ))}
          </div>
          <Modal showModal={VolunteerModal} setShowPopup={showVolunteerModal} height="h-full">
              {" "}
              <div className="text-center">
                <h1 className="text-xl font-bold">New Event Form</h1>
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
