import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CiCirclePlus } from "react-icons/ci";

import Card from "@/components/Cards/card";
import RepairAttemptForm from "@/components/Forms/create-repair-request";
import Header, { HeaderProps } from "@/components/Header";
import Modal from "@/components/Modal";
import { Search } from "@/components/Search";
import SortBy from "@/components/Search/SortBy";
import Sidebar from "@/components/sidebar/index";
import LoadingSpinner from "@/components/UI/loading-spinner";
import { useAuth } from "@/hooks/auth";
import { useRepairRequests } from "@/hooks/events";
import { useEvent } from "@/hooks/events";
import useSearchParamsState from "@/hooks/search-params-state";
import { RepairRequestResponse } from "@/types";

export default function RepairRequests() {
  const [eventModal, showEventModal] = useState(false);
  const [headerValues, setHeaderValues] = useState<HeaderProps>();
  const {
    query: { id }
  } = useRouter();

  const eventId = id?.toString();
  const sortBy = [
    { key: "status", label: "Status" },
    { key: "itemType", label: "Item Type" },
    { key: "brand", label: "Brand" }
  ];
  const assignedToOptions = [
    { key: "me", label: "Assigned to me" },
    { key: "unassigned", label: "Unassigned" }
  ];

  const { user } = useAuth();

  const [{ search, sortKey, sortDir, assignedTo }, setSearchParams] =
    useSearchParamsState({
      search: "",
      sortKey: "",
      sortDir: "asc",
      assignedTo: ""
    });

  const validatedSortDir =
    sortDir == "asc" || sortDir == "desc" ? sortDir : "asc";

  const { data: repairRequests } = useRepairRequests({
    eventId,
    sortKey,
    sortMethod: validatedSortDir,
    searchWord: search,
    assignedTo: assignedTo === "me" ? user?.id : assignedTo
  });
  const { data: event } = useEvent(eventId);

  function showForm() {
    showEventModal(true);
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
                      Repair Requests ({repairRequests?.items.length})
                    </span>
                  </div>
                  <div className="flex justify-end items-center">
                    <RadioButtons
                      options={assignedToOptions}
                      checkedKey={assignedTo}
                      onChange={(selectedKey) => {
                        setSearchParams((state) => ({
                          ...state,
                          assignedTo: selectedKey
                        }));
                      }}
                    />
                    <SortBy
                      options={sortBy}
                      sortKey={sortKey}
                      sortDir={validatedSortDir}
                      onChange={(sortKey, sortDir) => {
                        setSearchParams((state) => ({
                          ...state,
                          sortKey,
                          // Only store if the key is not empty
                          sortDir: sortKey ? sortDir : ""
                        }));
                      }}
                    />
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
                      className="flex items-center rounded-full bg-primary-500 transition hover:-translate-y-1 hover:cursor-pointer hover:bg-primary-400 w-10 h-10"
                      role="presentation"
                      onClick={showForm}
                      onKeyDown={showForm}
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
              <div className="grid gap-4 p-4 sm:grid-rows-2 md:grid-rows-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 relative">
                {!repairRequests ? (
                  <LoadingSpinner className="w-full h-full flex items-center justify-center absolute" />
                ) : (
                  repairRequests.items.map((item: RepairRequestResponse) => {
                    let assignedTo = "Unassigned";
                    if (item.assignedTo) {
                      assignedTo =
                        item.assignedTo.firstName ??
                        item.assignedTo.emailAddress;
                    }
                    return (
                      <div key={item.id}>
                        <Card
                          props={{
                            title: item.id,
                            image: "/images/broken-clock-sad.jpg",
                            description: item.description,
                            status: item.status,
                            firstName: assignedTo,
                            lastName: item.assignedTo?.lastName ?? "",
                            avatar: "/images/repair_lab_logo.jpg",
                            repairRequestProps: item
                          }}
                        />
                      </div>
                    );
                  })
                )}

                <Modal showModal={eventModal} setShowPopup={showEventModal}>
                  {" "}
                  <div className="text-center">
                    <h1 className="text-xl font-bold">Add a repair request</h1>
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

function RadioButtons({
  checkedKey,
  options,
  onChange
}: {
  checkedKey?: string;
  options: { key: string; label: string }[];
  onChange?: (selectedKey: string) => void;
}) {
  return (
    <fieldset className="flex flex-col">
      {options.map(({ key, label }) => (
        <label key={key}>
          <input
            type="radio"
            id={key}
            value={key}
            name="assigned"
            checked={key === checkedKey}
            // onClick to allow for deselecting radio buttons
            onClick={(e) =>
              onChange?.(
                e.currentTarget.value === checkedKey
                  ? ""
                  : e.currentTarget.value
              )
            }
          />
          {label}
        </label>
      ))}
    </fieldset>
  );
}
