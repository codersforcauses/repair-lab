import { useEffect, useState } from "react";
import Image from "next/image";
import { faChevronDown, faChevronUp,faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Event } from "@prisma/client";

function Table() {
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
