import { useEffect, useState } from "react";
import Image from "next/image";
import { faChevronDown, faChevronUp, faSearch, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Event } from "@prisma/client";
import { useRouter } from "next/router";



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
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formData, setFormData] = useState<Partial<Event>>({
    id: undefined,
    name: "",
    createdBy: "",
    location: "",
    startDate: undefined,
    eventType: "",
    status: undefined,
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
    params.append('sortKey', sortKey);
    params.append('sortMethod', sortMethod);
  
    fetch(`/api/get_events?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setEventData(data);
      });
  }, []);
  


  function openOptions(selectedEvent: Event) {
    setFormData(selectedEvent);
    setShowForm(true);
  }

  function handleAddEvent(){
    setShowCreateForm(true);
    setFormData({
      id: undefined,
      name: "",
      createdBy: "",
      location: "",
      startDate: undefined,
      eventType: "",
      status: undefined
    });
  }

  async function AddEvent(event: React.FormEvent<HTMLFormElement>){
    console.log("in add function")

    try{
      const response = await fetch("api/add_event", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",

        },
        body: JSON.stringify(formData),
      });

      if (response.ok){
        const addEvent = await response.json();
        setShowForm(false);
        router.reload(); 
      }
    }
    catch (error){
      console.error("Failed")
    }

  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log("in function");
    event.preventDefault();
  
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
        setShowForm(false);
        router.reload(); // Reload the page to update the event data
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("An error occurred while updating the event:", error);
    }
  }

  
  // function handleSearch(searchTerm: string) {
  //   const params = new URLSearchParams();
  //   params.append("sortKey", sortKey);
  //   params.append("sortMethod", sortMethod);
  //   params.append("search", searchTerm);

  //   fetch(`/api/search?${params.toString()}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setEventData(data);
  //     });
      
  // }

  useEffect(()=> {
    const params = new URLSearchParams();
    params.append('sortKey', sortKey);
    params.append('sortMethod', sortMethod);
    params.append('searchWord', searchWord);
  
    fetch(`/api/search?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setEventData(data);
      });
  },[sortKey, sortMethod, searchWord]);
  
  

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

      <div className="flex justify-center">
        <div className="w-5/12 p-4  relative">
          <input
            className="w-full h-10 px-5 py-2 rounded-3xl bg-gray-100 border-none text-sm focus:shadow-md focus:outline-none "
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => setSearchWord(e.target.value)}
            style={{ backgroundColor: "rgb(239, 239, 239)" }}
          />
          <div
            className="absolute right-8 top-2/4 transform -translate-y-2/4 text-gray-500 cursor-pointer"
          >
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      </div>

      

      <div className="flex justify-center">
        <div className="container">
          <table>
            <thead>
              <tr>
                {headers.map((row) => (
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
                ))}
                <th className="text-justify w-24"> Edit </th>
              </tr>
            </thead>

            <tbody>
              {eventData.map((event: Event) => {
                return (
                  <tr key={event.name}>
                    <td>{event.name}</td>
                    <td>{event.createdBy}</td>
                    <td>{event.location}</td>
                    <td>{formatDate(String(event.startDate))}</td>
                    <td>{event.eventType}</td>
                    <td>{event.status}</td>
                    <td className="ml-0 text-center pl-0 align-center">
                      <button onClick={() => openOptions(event)}>
                        <FontAwesomeIcon icon={faCog} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
        <button onClick={handleAddEvent}>Add Event</button>
    {showCreateForm && (
      <div className="form-popup">
        <form onSubmit={AddEvent}>
            {headers.map((row) => (
              <div key={row.key}>
                <label>{row.label}</label>
                <input
                  type="text"
                  name={row.key}
                  value={formData[row.key as keyof Partial<Event>]}
                  onChange={handleInputChange}
                />
              </div>))}
          <button type="submit">Save</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button>
        </form>
      </div>
   )}


        </div>
      </div>

      

      {showForm && (
        <div className="form-popup">
          <form onSubmit={handleSubmit}>
            {headers.map((row) => (
              <div key={row.key}>
                <label>{row.label}</label>
                <input
                  type="text"
                  name={row.key}
                  value={formData[row.key as keyof Partial<Event>]}
                  onChange={handleInputChange}
                />
              </div>

              
            ))}
            <button type="submit">Save</button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>


        
      )}
    </div>
    
  );
}

export default Table;
