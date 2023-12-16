import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import AssigneeBadge from "@/components/Cards/assignee-badge";
import VolunteerManageForm from "@/components/Forms/volunteer-manage-form";
import Header, { HeaderProps } from "@/components/Header";
import Modal from "@/components/Modal";
import Sidebar from "@/components/sidebar/index";
import LoadingSpinner from "@/components/UI/loading-spinner";
import { useEvent } from "@/hooks/events";
import { User } from "@/types";

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState<User[]>([]);
  const [headerValues, setHeaderValues] = useState<HeaderProps>();
  const [VolunteerModal, showVolunteerModal] = useState(false);
  const {
    query: { id: eventId }
  } = useRouter();

  const { data: event } = useEvent(eventId as string);

  useEffect(() => {
    if (!eventId) return;

    // TODO: Complete when endpoint is changed to /api/event/[id]/repairers
    fetch(`/api/event/${eventId}`)
      .then((res) => res.json())
      .then((event) => {
        console.log(event);
        // setVolunteers(event.volunteers); // TODO: This is actually an array of volunteer ids, so later we need to get the volunteer info from the clerk
        setHeaderValues({
          name: event.name,
          location: event.location,
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate),
          createdBy: event.createdBy // TODO: Later get name from clerk, given userID
        });
      });
  }, [eventId]);

  function manageVolunteer() {
    showVolunteerModal(true);
  }
  return (
    <Sidebar>
      <main className="ml-80 min-h-screen w-full p-4">
        {headerValues ? (
          <>
            <Header {...headerValues} />
            <div className="container">
              <div className="flex flex-row w-auto p-4 text-2xl font-bold text-zinc-400 content-center justify-between">
                <span>Volunteers ({volunteers.length})</span>
                <button
                  className="flex rounded-lg border bg-primary-500 p-2 w-1/5 shadow-md transition hover:cursor-pointer hover:bg-primary-300 text-sm text-white justify-center"
                  onClick={manageVolunteer}
                  onKeyDown={manageVolunteer}
                >
                  Add Volunteers
                </button>
              </div>
              <div className="container mx-auto">
                <div className="flex justify-end"></div>
              </div>
              <div className="grid gap-4 p-4 lg:grid-cols-5 ">
                {volunteers.map((item) => (
                  <div key={item.id}>
                    <AssigneeBadge
                      firstName={item.firstName ?? item.emailAddress}
                      lastName={item.lastName ?? ""}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Modal
              showModal={VolunteerModal}
              setShowPopup={showVolunteerModal}
              height="h-full"
            >
              {" "}
              <div className="text-center">
                <h1 className="text-xl font-bold">Add Volunteers</h1>
                <div>
                  <VolunteerManageForm />
                </div>
              </div>
            </Modal>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center ">
            <LoadingSpinner />
          </div>
        )}
      </main>
    </Sidebar>
  );
}
