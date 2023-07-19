import { useEffect, useState } from "react";
import Image from "next/image";
import {
  faChevronDown,
  faChevronUp,
  faSearch,
  faPencil,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Event } from "@prisma/client";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";

import { Dialog } from "@headlessui/react";

function Table() {
  const router = useRouter();

  function formatDate(dateString: string): string {
    const actualDate = new Date(dateString);
    const day = actualDate.getDate().toString().padStart(2, "0");
    const month = (actualDate.getMonth() + 1).toString().padStart(2, "0");
    const year = actualDate.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  const [eventData, setEventData] = useState<Event[]>([]);
  const [sortKey, setSortKey] = useState<string>("startDate");
  const [searchWord, setSearchWord] = useState<string>("");
  const [sortMethod, setSortMethod] = useState<string>("asc");
  const [expandedButton, setExpandedButton] = useState<string>("");
  const [modalActive, toggleModal] = useState(false);

  const [formData, setFormData] = useState<Partial<Event>>({
    id: undefined,
    name: "",
    createdBy: "",
    location: "",
    startDate: undefined,
    eventType: "",
    status: undefined
  });

  // The label is what users see, the key is what the server uses
  const headers: { key: string; label: string }[] = [
    { key: "name", label: "Event Name" },
    { key: "createdBy", label: "Event Manager" },
    { key: "location", label: "Location" },
    { key: "startDate", label: "Date" },
    { key: "eventType", label: "Type" },
    { key: "status", label: "Status" }
  ];

  const sortMethods = [
    { key: "asc", label: "Ascending" },
    { key: "desc", label: "Descending" }
  ];

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("sortKey", sortKey);
    params.append("sortMethod", sortMethod);

    fetch(`/api/get_events?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setEventData(data);
      });
  }, []);

  //will toggle modal visibility for editing events

  function openOptions(selectedEvent: Event) {
    setFormData(selectedEvent);
    toggleModal(true);
  }

  // takes form values and posts them to DB
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log("in function");
    event.preventDefault();

    try {
      const response = await fetch("/api/edit_event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedEvent = await response.json();
        // Do something with the updated event, if needed
        console.log(updatedEvent);
        toggleModal(false);
        router.reload(); // Reload the page to update the event data
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("An error occurred while updating the event:", error);
    }
  }

  //handles searching
  useEffect(() => {
    const params = new URLSearchParams();
    params.append("sortKey", sortKey);
    params.append("sortMethod", sortMethod);
    params.append("searchWord", searchWord);

    fetch(`/api/search?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setEventData(data);
      });
  }, [sortKey, sortMethod, searchWord]);

  // formats input data before passing it on
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    // Convert startDate to a Date object before assigning it
    if (name === "startDate") {
      const formattedDate = new Date(value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedDate
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  }

  function handleButtonClick(key: string) {
    if (expandedButton === key) {
      setExpandedButton("");
    } else {
      setExpandedButton(key);
    }

    // If the clicked column is already the sort key, toggle the sort method
    if (sortKey === key) {
      setSortMethod(sortMethod === "asc" ? "desc" : "asc");
    } else {
      // If it's a new column, set it as the sort key with ascending order
      setSortKey(key);
      setSortMethod("asc");
    }
  }

  function ToggleChevron(column: string) {
    const columnInt = parseInt(column.column);
    return (
      <button onClick={() => handleButtonClick(headers[columnInt].key)}>
        {" "}
        {headers[columnInt].key === expandedButton ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </button>
    );
  }

  // modal component, will need to be adjusted to not refresh using maps
  function Modal({ props }) {
    return (
      <div className=" flex items-center justify-center">
        <Dialog
          open={modalActive}
          onClose={() => toggleModal(false)}
          className="absolute inset-0 flex justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <Dialog.Title className=" flow-root border-slate-300 bg-lightAqua-300 p-4 font-semibold">
              <span className="float-left"> Edit Event Details </span>
              <button
                onClick={() => toggleModal(false)}
                className="float-right h-6 w-6 items-center rounded-full hover:bg-lightAqua-500"
              >
                <FontAwesomeIcon
                  className="align-middle align-text-top text-xl"
                  icon={faXmark}
                />
              </button>
            </Dialog.Title>

            {/*main form*/}
            {children}
          </Dialog.Panel>
        </Dialog>
      </div>
    );
  }

  function handleSort(key: string) {
    setSortKey(key);
  }

  function SortOptions() {
    // Basic functionality for sorting, styling incomplete
    return (
      <div>
        <select onChange={(e) => setSortMethod(e.target.value)}>
          {sortMethods.map((header) => (
            <option value={header.key} key={header.key}>
              {header.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      {/*HEADER BAR*/}
      <div className=" flex w-full flex-row border-b-[2px] border-slate-300 ">
        <Image
          className="m-10 mb-5 mt-5"
          src="/images/repair_lab_logo.jpg"
          alt="logo"
          width="90"
          height="90"
        />
        <h1 className="mt-[50px] text-3xl font-semibold text-slate-600">
          {" "}
          Event Listings
        </h1>

        {/*ACCOUNT AREA*/}
        <div className="absolute right-10 self-center justify-self-end">
          <span className="mr-2 font-light text-slate-600"> Account Name </span>
          <button
            className="h-12 w-12 rounded-full bg-slate-800"
            onClick={() => toggleModal(true)}
          >
            O
          </button>
        </div>
      </div>

      {/*options modal*/}

      <div className=" flex items-center justify-center">
        <Dialog
          open={modalActive}
          onClose={() => toggleModal(false)}
          className="absolute inset-0 flex justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <Dialog.Title className=" flow-root border-slate-300 bg-lightAqua-300 p-4 font-semibold">
              <span className="float-left"> Edit Event Details </span>
              <button
                onClick={() => toggleModal(false)}
                className="float-right h-6 w-6 items-center rounded-full hover:bg-lightAqua-500"
              >
                <FontAwesomeIcon
                  className="align-middle align-text-top text-xl"
                  icon={faXmark}
                />
              </button>
            </Dialog.Title>
            <Dialog.Description className="p-3 font-light">
              Select each field below to change their contents
            </Dialog.Description>

            {/*main form*/}
            <form onSubmit={handleSubmit}>
              {headers.map((row) => (
                <div key={row.key} className="flow-root">
                  <label className="float-left m-1 pb-[10px] pl-10 text-sm font-light">
                    {row.label}
                  </label>
                  <input
                    type="text"
                    name={row.key}
                    value={formData[row.key as keyof Partial<Event>]}
                    onChange={handleInputChange}
                    className="float-right m-1 mr-10 rounded-md border border-slate-400 p-1 text-sm font-light text-slate-600"
                  />
                </div>
              ))}

              {/*Bottom button row*/}

              <div className=" mt-3 border-t-[2px] border-slate-200 align-bottom">
                <button
                  type="submit"
                  className="m-1 rounded border border-lightAqua-500 bg-transparent px-2 py-1 text-sm font-light text-lightAqua-500 hover:border-transparent hover:bg-lightAqua-500 hover:text-white"
                >
                  Submit
                </button>

                <button
                  onClick={() => toggleModal(false)}
                  className="m-2 rounded border border-lightAqua-500 bg-transparent px-2 py-1 text-sm font-light text-lightAqua-500 hover:border-transparent hover:bg-lightAqua-500 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </Dialog>
      </div>

      {/* Search bar above table */}
      <div className="flex justify-center">
        <div className="relative w-5/12 p-4">
          <input
            className="h-10 w-full rounded-3xl border-none bg-gray-100 px-5 py-2 text-sm focus:shadow-md focus:outline-none "
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => setSearchWord(e.target.value)}
            style={{ backgroundColor: "rgb(239, 239, 239)" }}
          />
          <button
            className="absolute right-8 top-2/4 -translate-y-2/4 transform cursor-pointer text-gray-500"
            onClick={() => {
              // Handle search submit action here
              console.log("Search submitted");
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      {/*main table*/}
      <div className="flex justify-center">
        <div className="container ">
          <table className="table-auto">
            <thead>
              <tr className="pb-10 text-left">
                <th className="pl-5">
                  {" "}
                  {headers[0].label} <ToggleChevron column="0" />{" "}
                </th>
                <th>
                  {" "}
                  {headers[1].label} <ToggleChevron column="1" />{" "}
                </th>
                <th>
                  {" "}
                  {headers[2].label} <ToggleChevron column="2" />{" "}
                </th>
                <th>
                  {" "}
                  {headers[3].label} <ToggleChevron column="3" />{" "}
                </th>
                <th>
                  {" "}
                  {headers[4].label} <ToggleChevron column="4" />{" "}
                </th>
                <th>
                  {" "}
                  {headers[5].label} <ToggleChevron column="5" />{" "}
                </th>
                <th className="w-10 text-justify"> Edit </th>
              </tr>
            </thead>

            <tbody>
              {eventData.map((event: Event) => {
                return (
                  <tr
                    key={event.name}
                    className="first:ml-50 last:mr-10 even:bg-slate-100 hover:bg-slate-200"
                  >
                    <td className="pl-5 font-light">
                      <button
                        onClick={() => router.push("/event-form/" + event.id)}
                      >
                        {event.name}
                      </button>
                    </td>
                    <td className="font-light">{event.createdBy}</td>
                    <td className="font-light">{event.location}</td>
                    <td className="font-light">
                      {formatDate(String(event.startDate))}
                    </td>
                    <td className="font-light">{event.eventType}</td>
                    <td className="font-light">{event.status}</td>
                    <td className="align-center ml-0 pl-0 text-center ">
                      <button onClick={() => openOptions(event)}>
                        <FontAwesomeIcon icon={faPencil} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
