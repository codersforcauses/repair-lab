import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { CiCirclePlus } from "react-icons/ci";

import Card from "@/components/Cards/card";
import RepairAttemptForm from "@/components/Forms/create-repair-request";
import Header, { HeaderProps } from "@/components/Header";
import Modal from "@/components/Modal";
import { Pagination, PaginationState } from "@/components/pagination";
import { Search } from "@/components/Search";
import SortBy from "@/components/Search/SortBy";
import Select from "@/components/select";
import Sidebar from "@/components/sidebar/index";
import SingleSelectCheckboxes from "@/components/single-check-box";
import LoadingSpinner from "@/components/UI/loading-spinner";
import { useAuth } from "@/hooks/auth";
import { useRepairRequests } from "@/hooks/events";
import { useEvent } from "@/hooks/events";
import { useItemTypes } from "@/hooks/item-types";
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

  const [
    { search, sortKey, sortDir, assignedTo, page, perPage, itemType },
    setSearchParams
  ] = useSearchParamsState({
    search: "",
    sortKey: "",
    sortDir: "asc",
    assignedTo: "",
    itemType: "",
    page: "1",
    perPage: "10"
  });

  const validatedSortDir =
    sortDir == "asc" || sortDir == "desc" ? sortDir : "asc";

  const { data: itemTypes = [] } = useItemTypes();

  // Placeholder data is used to display pagination data while next page loads
  const {
    data: repairRequests,
    isPlaceholderData,
    isError
  } = useRepairRequests({
    eventId,
    sortKey,
    sortMethod: validatedSortDir,
    searchWord: search,
    assignedTo: assignedTo === "me" ? user?.id : assignedTo,
    itemType,
    page: +page,
    perPage: +perPage
  });

  const pagination = useMemo((): PaginationState => {
    return {
      current: Number(page),
      perPage: Number(perPage),
      total: repairRequests?.meta.totalCount ?? 0
    };
  }, [repairRequests?.meta.totalCount, page, perPage]);

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

  function RepairRequestList() {
    // Error state
    if (isError)
      return (
        <div className="w-full h-full flex items-center justify-center absolute text-red-500 text-6xl select-none">
          !
        </div>
      );
    // Loading state
    if (!repairRequests || isPlaceholderData)
      return (
        <LoadingSpinner className="w-full h-full flex items-center justify-center absolute" />
      );
    // Success
    return repairRequests.items.map((item: RepairRequestResponse) => {
      let assignedTo = "Unassigned";
      if (item.assignedTo) {
        assignedTo = item.assignedTo.firstName ?? item.assignedTo.emailAddress;
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
    });
  }

  return (
    <Sidebar>
      <main className="ml-80 min-h-screen w-full p-4">
        {headerValues ? (
          <>
            <Header {...headerValues} />
            <div className="container">
              <div className="container mx-auto items-center">
                <div className="flex justify-between pr-4">
                  <div className="w-auto p-4 text-2xl font-bold text-zinc-400">
                    <span>
                      Repair Requests ({repairRequests?.meta.totalCount})
                    </span>
                  </div>
                  <div className="flex justify-end items-center  gap-2">
                    <SingleSelectCheckboxes
                      options={assignedToOptions}
                      checkedKey={assignedTo}
                      onChange={(selectedKey) => {
                        setSearchParams((state) => ({
                          ...state,
                          assignedTo: selectedKey
                        }));
                      }}
                    />
                    <Select
                      className="w-36"
                      multiple
                      label="Item Type"
                      options={itemTypes.map(({ name }) => ({
                        name,
                        value: name
                      }))}
                      value={itemType}
                      onChange={(itemType) =>
                        setSearchParams((state) => ({ ...state, itemType }))
                      }
                    />
                    <SortBy
                      options={sortBy}
                      sortKey={sortKey}
                      sortDir={validatedSortDir}
                      onChange={(sortKey, sortDir) => {
                        setSearchParams((state) => ({
                          ...state,
                          sortKey,
                          sortDir
                        }));
                      }}
                    />
                    <Search
                      className="sm:w-auto "
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
              <Pagination
                className="mt-0 pl-4 pr-4"
                value={pagination}
                onChange={(nextState) => {
                  setSearchParams((state) => ({
                    ...state,
                    page: String(nextState.current),
                    perPage: String(nextState.perPage)
                  }));
                }}
              />
              <div className="grid gap-4 p-4 sm:grid-rows-2 md:grid-rows-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 relative">
                <RepairRequestList />

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
