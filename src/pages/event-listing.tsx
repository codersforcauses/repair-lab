import { useEffect, useState } from "react";
import Image from "next/image";
import { faChevronDown, faChevronUp, faSearch, faCog, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Event } from "@prisma/client";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";

import { Dialog } from '@headlessui/react'



function Table() {
  const [formData, setFormData] = useState<Partial<Event>>({
    id: undefined,
    name: "",
    createdBy: "",
    location: "",
    startDate: undefined,
    eventType: "",
    status: undefined,
  });

  const router = useRouter();

  const { register, setValue, formState: { errors } } = useForm<FormData>();

  const [modalActive, toggleModal] = useState(false)
  const onSubmit = handleSubmit(data => console.log(data));


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
  useEffect(() => {
    const params = new URLSearchParams();
    params.append('sortKey', sortKey);
    params.append('sortMethod', sortMethod);
  
    fetch(`/api/get_events?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setEventData(data);
      });
  }, [sortKey, sortMethod]);


  //will toggle modal visibility for editing events

  function openOptions(selectedEvent: Event) {
    setFormData(selectedEvent);
    toggleModal(true);
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

    // takes form values and posts them to DB
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log("in function");
    //event.preventDefault();
  
    try {

      const response = await fetch("/api/edit_event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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

  function handleSearch(searchTerm: string) {
    const params = new URLSearchParams();
    params.append("sortKey", sortKey);
    params.append("sortMethod", sortMethod);
    params.append("search", searchTerm);

    fetch(`/api/search?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setEventData(data);
      });
  }

  // formats input data before passing it on
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
  
    // Convert startDate to a Date object before assigning it
    if (name === "startDate") {
      const formattedDate = new Date(value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedDate,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
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

  function EditForm(column: string){
    //const key = row.key;
    //const label = row.label;

    //setValue(key, "content");

    // return (
    //   <form onSubmit={handleSubmit} className="flow-root">
    //     <label className="font-light text-sm m-1 pl-10 float-left">{label}:</label>
    //     <input {...register(key)} className="rounded-md border-slate-400 border text-sm p-1 m-1 font-light text-slate-600 float-right mr-10" /> <br/>
    //   </form>
    // );

    return (
      <form onSubmit={handleSubmit} className="flow-root flex flex-col">
        
        

        <div className="float-left flex flex-col">
          <label className="font-light text-sm m-1 pb-[10px] pl-10 float-left">{headers[0].label}:</label>
          <label className="font-light text-sm m-1 pb-[10px] pl-10 float-left">{headers[1].label}:</label>
          <label className="font-light text-sm m-1 pb-[10px] pl-10 float-left">{headers[2].label}:</label>
          <label className="font-light text-sm m-1 pb-[10px] pl-10 float-left">{headers[3].label}:</label>
          <label className="font-light text-sm m-1 pb-[10px] pl-10 float-left">{headers[4].label}:</label>
          <label className="font-light text-sm m-1 pb-[10px] pl-10 float-left">{headers[5].label}:</label>
        </div>

        <div className="float-right">
          <input {...register(headers[0].key)} onChange={handleInputChange} className="rounded-md border-slate-400 border text-sm p-1 m-1 font-light text-slate-600 float-right mr-10" /> <br/>
          <input {...register(headers[1].key)} onChange={handleInputChange} className="rounded-md border-slate-400 border text-sm p-1 m-1 font-light text-slate-600 float-right mr-10" /> <br/>
          <input {...register(headers[2].key)} onChange={handleInputChange} className="rounded-md border-slate-400 border text-sm p-1 m-1 font-light text-slate-600 float-right mr-10" /> <br/>
          <input {...register(headers[3].key)} onChange={handleInputChange} className="rounded-md border-slate-400 border text-sm p-1 m-1 font-light text-slate-600 float-right mr-10" /> <br/>
          <input {...register(headers[4].key)} onChange={handleInputChange} className="rounded-md border-slate-400 border text-sm p-1 m-1 font-light text-slate-600 float-right mr-10" /> <br/>
          <input {...register(headers[5].key)} onChange={handleInputChange} className="rounded-md border-slate-400 border text-sm p-1 m-1 font-light text-slate-600 float-right mr-10" /> <br/>
        </div>

        <input type="submit" id="submit-form" class="hidden" />
      </form>
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
      <div className=" w-full flex flex-row p-5 pb-2 border-slate-300 border-b-[2px] ">
        <Image className=""
          src="/images/repair_lab_logo.jpg"
          alt="logo"
          width="90"
          height="90"
        />
        <h1 className="ml-20 text-slate-600 text-3xl font-semibold mt-10"> Event Listings</h1>

        {/*ACCOUNT AREA*/}
        <div className="self-center justify-self-end absolute right-10">
          <span className="text-slate-600 font-light mr-2"> Account Name </span>
          <button className="w-12 h-12 bg-slate-800 rounded-full" onClick={() => toggleModal(true)}>
            O
          </button>
        </div>
      </div>

       {/*options modal*/}

      <div className=" flex justify-center items-center">
          <Dialog open={modalActive} onClose={() => toggleModal(false)}
          className="flex justify-center p-4 text-center sm:items-center sm:p-0 inset-0 absolute">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <Dialog.Title className=" flow-root border-slate-300 p-4 bg-lightAqua-300 font-semibold">
                <span className="float-left"> Edit Event Details </span>
                <button onClick={() => toggleModal(false)} className="hover:bg-lightAqua-500 rounded-full items-center w-6 h-6 float-right">
                  <FontAwesomeIcon className="align-middle text-xl align-text-top" icon={faXmark} />
                </button>

              </Dialog.Title>
              <Dialog.Description  className="p-3 font-light">
                Select each field below to change their contents
              </Dialog.Description >

              {/*main form*/}
              <EditForm column="0"/>

              <Dialog.Description className=" border-t-[2px] border-slate-200 align-bottom mt-3">
                <label for="submit-form" tabindex="0" className="bg-transparent hover:bg-lightAqua-500 text-lightAqua-500 font-light hover:text-white py-[6px] px-2 border border-lightAqua-500 hover:border-transparent rounded m-2 text-sm">Submit</label>
                {/*<button onClick={() => toggleModal(false)} className="bg-transparent hover:bg-lightAqua-500 text-lightAqua-500 font-light hover:text-white py-1 px-2 border border-lightAqua-500 hover:border-transparent rounded m-1 text-sm">*/}
                
                {/*</button>*/}
                <button onClick={() => toggleModal(false)} className="bg-transparent hover:bg-lightAqua-500 text-lightAqua-500 font-light hover:text-white py-1 px-2 border border-lightAqua-500 hover:border-transparent rounded m-2 text-sm">
                  Cancel
                </button>
              </Dialog.Description>
            </Dialog.Panel>
          </Dialog>
      </div>

      {/* Basic functionality for sorting, styling incomplete */}

      <div className="flex justify-center">
        <div className="w-5/12 p-4 relative">

          <input
            className="w-full h-10 px-5 py-2 rounded-3xl bg-gray-100 border-none text-sm focus:shadow-md focus:outline-none "
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
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

      {/*main table*/}
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
                  <tr key={event.name} className="first:ml-50 last:mr-10 hover:bg-slate-100">
                    <td className="pl-5">{event.name}</td>
                    <td>{event.createdBy}</td>
                    <td>{event.location}</td>
                    <td>{formatDate(String(event.startDate))}</td>
                    <td>{event.eventType}</td>
                    <td>{event.status}</td>
                    <td className="ml-0 text-center pl-0 align-center " ><button onClick={() => toggleModal(true)}> <FontAwesomeIcon icon={faCog} /> </button></td>
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
