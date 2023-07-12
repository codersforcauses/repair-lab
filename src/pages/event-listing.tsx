import { useEffect, useState } from "react";
import Image from "next/image";
import { faChevronDown, faChevronUp, faSearch, faCog, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Event } from "@prisma/client";

import { useForm } from "react-hook-form";

import { Dialog } from '@headlessui/react'




async function getEvent(eventName: string) {
  return await prisma.event.findUnique({
    where: {name: eventName}
  })
}

function Table() {
  const [modalActive, toggleModal] = useState(false)


  function formatDate(dateString: string): string {
    const actualDate = new Date(dateString);
    const day = actualDate.getDate().toString().padStart(2, "0");
    const month = (actualDate.getMonth() + 1).toString().padStart(2, "0");
    const year = actualDate.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  const [eventData, setEventData] = useState<Event[]>([]);
  const [sortKey, setSortKey] = useState<string>("startDate");
  const [sortMethod, setSortMethod] = useState<string>("asc");
  const [expandedButton, setExpandedButton] = useState<string>("");


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

  // Whenever the sortKey or sortMethod changes, the useEffect hook will run
  // useEffect(() => {
  //   const params = new URLSearchParams();
  //   params.append('sortKey', sortKey);
  //   params.append('sortMethod', sortMethod);
  
  //   fetch(`/api/get_events?${params.toString()}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setEventData(data);
  //     });
  // }, [sortKey, sortMethod]);


  //will toggle modal visibility for editing events

  useEffect(() => {

  }, [modalActive]);
  

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

  function ToggleChevron(column: string){
    const columnInt = parseInt(column.column);
    return(
      <button
        onClick={() => handleButtonClick(headers[columnInt].key)}> {headers[columnInt].key === expandedButton ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </button>
    );
  }

  function openOptions(){

  }

  function handleSort(key: string) {
    setSortKey(key);
  }

  function optionsModal(name: string) {
    return (
      <div className="absolute align-middle self-center w-1/2 h-2/3 border-slate-700 bg-50 rounded-md">
        <h1> MODAL TIME </h1>
      </div>
      );
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


      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "20px",
          paddingLeft: "20px"
        }}
      >
        <Image
          src="/images/repair_lab_logo.jpg"
          alt="logo"
          width="80"
          height="80"
        />
        <h1 style={{ marginLeft: "10px", color: "rgb(175, 177, 182)", fontWeight: 600, fontSize: "24px" }}>Event Listings</h1>
      </div>

       {/*options modal*/}
      <div>
        <button onClick={() => toggleModal(true)}>Open Modal</button>
          <Dialog open={modalActive} onClose={() => toggleModal(false)}
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <Dialog.Title className=" flow-root border-b-[1px] border-slate-300 p-4 bg-lightAqua-300 font-semibold">
                <span className="float-left"> Edit Event Details </span>
                <button onClick={() => toggleModal(false)} className="hover:bg-lightAqua-500 rounded-full items-center w-6 h-6 float-right">
                  <FontAwesomeIcon className="align-middle text-xl align-text-top" icon={faXmark} />
                </button>

              </Dialog.Title>
              <Dialog.Description className="p-3">
                Select each field below to change their contents
              </Dialog.Description>

              <p>
                
              </p>

              <div className=" border-t-[1px] border-slate-200 ">
                <button onClick={() => toggleModal(false)} className="bg-transparent hover:bg-lightAqua-500 text-lightAqua-500 font-light hover:text-white py-1 px-2 border border-lightAqua-500 hover:border-transparent rounded m-1 text-sm">
                  Accept
                </button>
                <button onClick={() => toggleModal(false)} className="bg-transparent hover:bg-lightAqua-500 text-lightAqua-500 font-light hover:text-white py-1 px-2 border border-lightAqua-500 hover:border-transparent rounded m-1 text-sm">
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </Dialog>
      </div>

      {/* Basic functionality for sorting, styling incomplete */}

      <div className="flex justify-center">
        <div className="w-5/12 p-4 bg-red-500  relative">

          <input
            className="w-full h-10 px-5 py-2 rounded-3xl bg-gray-100 border-none text-sm focus:shadow-md focus:outline-none "
            type="search"
            name="search"
            placeholder="Search"
            style={{ backgroundColor: "rgb(239, 239, 239)" }}
          />
          <div
            className="absolute right-8 top-2/4 transform -translate-y-2/4 text-gray-500 cursor-pointer"
            onClick={() => {
              // Handle search submit action here
              console.log("Search submitted");
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </div>

        </div>
      </div>
      <div className="flex justify-center">
        <div className="container ">
          <table className="table-auto">
          <thead>
              <tr className="pb-10 text-left">
                <th className="pl-5"> {headers[0].label} <ToggleChevron column="0"/> </th>
                <th> {headers[1].label} <ToggleChevron column="1"/> </th>
                <th> {headers[2].label} <ToggleChevron column="2"/> </th>
                <th > {headers[3].label} <ToggleChevron column="3"/> </th>
                <th> {headers[4].label} <ToggleChevron column="4"/> </th>
                <th> {headers[5].label} <ToggleChevron column="5"/> </th>

                {/*{headers.map((row) => (
                  <th key={row.key}>
                    {row.label}
                    <button
                      onClick={() => handleButtonClick(row.key)}
                      style={{
                        marginLeft: "5px",
                        fontWeight: row.key === expandedButton ? "bold" : "normal"
                      }}
                    >
                      {row.key === expandedButton ? (
                        <FontAwesomeIcon icon={faChevronUp} />
                      ) : (
                        <FontAwesomeIcon icon={faChevronDown} />
                      )}
                    </button>
                  </th>

                ))}*/}
                
                <th className="text-justify w-10"> Edit </th>
              </tr>
            </thead>


            <tbody>
              {eventData.map((event: Event) => {
                return (
                  <tr key={event.name} className="first:ml-50 last:mr-10 hover:bg-slate-700">
                    <td className="pl-5">{event.name}</td>
                    <td>{event.createdBy}</td>
                    <td className="">{event.location}</td>
                    <td>{formatDate(String(event.startDate))}</td>
                    <td>{event.eventType}</td>
                    <td>{event.status}</td>
                    <td className="ml-0 text-center pl-0 align-center " ><button> <FontAwesomeIcon icon={faCog} /> </button></td>
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
