import { useState } from "react";
import { useRouter } from "next/router";
import { CiCirclePlus } from "react-icons/ci";

import Card from "@/components/Cards/card";
import RepairAttemptForm from "@/components/Forms/repair-request-form";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import SearchBar from "@/components/Search/SearchBar";
import SortBy from "@/components/Search/SortBy";
import Sidebar from "@/components/sidebar/index";
import { useRepairRequests } from "@/hooks/events";
import { useEvent } from "@/hooks/events";
import { RepairRequest } from "@/types";

export default function RepairRequests() {
  const {
    query: { id: eventId }
  } = useRouter();

  const { isLoading, data: repairRequests } = useRepairRequests(
    eventId as string
  );

  const { isLoading: isEventLoading, data: event } = useEvent(
    eventId as string
  );

  const [eventModal, showEventModal] = useState(false);

  function newEvent() {
    showEventModal(true);
  }

  return (
    <Sidebar>
      <main className="ml-80 min-h-screen w-full p-4">
        {headerValues ? (
          <>
            <Header {...headerValues} />
            <div className="container">
              <div className="container mx-auto items-center">
                <div className="flex justify-between">
                  <div className="w-auto p-4 text-2xl font-bold text-zinc-400">
                    <span>
                      Repair Requests (
                      {!repairRequests ? (
                        <div className="w-full h-full flex items-center justify-center ">
                          <LoadingSpinner />
                        </div>
                      ) : (
                        repairRequests.length
                      )}
                      )
                    </span>
                  </div>
                  <div className="flex justify-end items-center">
                    <SortBy />
                    <SearchBar />
                    <div
                      className="flex items-center rounded-full bg-primary-500 transition hover:-translate-y-1 hover:cursor-pointer hover:bg-primary-400 w-10 h-10"
                      role="presentation"
                      onClick={newEvent}
                      onKeyDown={newEvent}
                    >
                      <CiCirclePlus
                        stroke="white"
                        color="rgb(82 82 91)"
                        size={50}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 p-4 sm:grid-rows-2 md:grid-rows-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
                {!repairRequests ? (
                  <div className="w-full h-full flex items-center justify-center ">
                    <LoadingSpinner />
                  </div>
                ) : (
                  repairRequests.map((item: RepairRequestResponse) => (
                    <div key={item.id}>
                      <Card
                        props={{
                          title: item.id,
                          image: "/images/broken-clock-sad.jpg",
                          description: item.description,
                          status: item.status,
                          firstName:
                            item.assignedTo.firstName ??
                            item.assignedTo.emailAddress,
                          lastName: "",
                          avatar: "/images/repair_lab_logo.jpg",
                          repairRequestProps: item
                        }}
                      />
                    </div>
                  ))
                )}

                <Modal showModal={eventModal} setShowPopup={showEventModal}>
                  {" "}
                  <div className="text-center">
                    <h1 className="text-xl font-bold">New Event Form</h1>
                    <div>
                      <RepairAttemptForm></RepairAttemptForm>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
          <div className="grid gap-4 p-4 sm:grid-rows-2 md:grid-rows-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
            {isLoading
              ? "Loading..."
              : repairRequests.map((item: RepairRequest) => (
                  <div key={item.id}>
                    <Card
                      props={{
                        title: item.id,
                        image: "/images/broken-clock-sad.jpg",
                        description: item.description,
                        status: item.status,
                        firstName: item.assignedTo,
                        lastName: "",
                        avatar: "/images/repair_lab_logo.jpg",
                        repairRequestProps: item
                      }}
                    />
                  </div>
                ))}
            <div
              className="flex w-full items-center justify-center rounded-lg border bg-grey-100 p-4 shadow-md transition hover:-translate-y-1 hover:cursor-pointer hover:bg-secondary-50"
              role="presentation"
              onClick={newEvent}
              onKeyDown={newEvent}
            >
              <CiCirclePlus color="rgb(82 82 91)" size={100} />
            </div>
            <Modal showModal={eventModal} setShowPopup={showEventModal}>
              {" "}
              <div className="text-center">
                <h1 className="text-xl font-bold">New Event Form</h1>
                <div>
                  <RepairAttemptForm></RepairAttemptForm>
                </div>
              </div>
            </Modal>
          </div>
          <span className="w-full border-b-[1px] border-gray-200 p-2"></span>
        </div>
      </main>
    </Sidebar>
  );
}
