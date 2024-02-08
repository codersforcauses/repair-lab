import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GoPlus } from "react-icons/go";

import Card from "@/components/Cards/card";
import RepairAttemptForm from "@/components/Forms/create-repair-request";
import Header, { HeaderProps } from "@/components/Header";
import Modal from "@/components/Modal";
import { Search } from "@/components/Search";
import SortBy from "@/components/Search/SortBy";
import Sidebar from "@/components/sidebar/index";
import LoadingSpinner from "@/components/UI/loading-spinner";
import { useEvent, useRepairRequests } from "@/hooks/events";
import useSearchParamsState from "@/hooks/search-params-state";
import { RepairRequestResponse } from "@/types";

export default function RepairRequests() {
  const [eventModal, showEventModal] = useState(false);
  const [headerValues, setHeaderValues] = useState<HeaderProps>();
  const {
    query: { id: eventId }
  } = useRouter();

  const { data: repairRequests } = useRepairRequests(eventId as string);

  const { data: event } = useEvent(eventId as string);

  function showForm() {
    showEventModal(true);
  }

  function hideForm() {
    showEventModal(false);
  }

  useEffect(() => {
    if (!event) return;
    setHeaderValues({
      name: event.name,
      location: event.location,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      createdBy: event.createdBy
    });
  }, [event]);

  const [{ search }, setSearchParams] = useSearchParamsState({
    search: undefined
  });

  return (
    <Sidebar>
      <main className="ml-80 min-h-screen w-full pt-5 pl-4 pr-14">
        {headerValues ? (
          <>
            <Header {...headerValues} />
            <div className="container">
              <div className="container mx-auto items-center">
                <div className="flex justify-between">
                  <div className="w-auto p-4 text-2xl font-bold text-zinc-400">
                    <span>Repair Requests ({repairRequests?.length})</span>
                  </div>
                  <div className="flex justify-end items-center">
                    <SortBy />
                    <Search
                      className="sm:w-auto m-4"
                      value={search}
                      onChange={(value) =>
                        setSearchParams((state) => ({
                          ...state,
                          search: value
                        }))
                      }
                    />
                    <div
                      className="flex items-center rounded-full white transition hover:-translate-y-1 hover:cursor-pointer w-10 h-10"
                      role="presentation"
                      onClick={showForm}
                      onKeyDown={showForm}
                    >
                      <GoPlus
                        color="grey"
                        size={50}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 p-4 sm:grid-rows-2 md:grid-rows-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 relative">
                {!repairRequests ? (
                  <LoadingSpinner className="w-full h-full flex items-center justify-center absolute" />
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

                <Modal
                  title="Add a Repair Request"
                  showModal={eventModal}
                  setShowPopup={showEventModal}
                >
                  <div className="text-center">
                    <div className="max-w-full">
                      <RepairAttemptForm eventId={eventId as string} />
                    </div>
                  </div>
                </Modal>
              </div>
              <span className="w-full border-b-[1px] border-gray-200 p-2"></span>
            </div>
          </>
        ) : (
          <LoadingSpinner className="w-full h-full flex items-center justify-center" />
        )}
      </main>
    </Sidebar>
  );
}
