import { useEffect, useState } from "react";
import Image from "next/image";
import { Event } from "@prisma/client";
  


function SortableTable() {

  function formatDate(dateString: string): string {
    const actualDate = new Date(dateString);
    const day = actualDate.getDate().toString().padStart(2, '0');
    const month = (actualDate.getMonth() + 1).toString().padStart(2, '0');
    const year = actualDate.getFullYear().toString();

  
    return `${day}/${month}/${year}`;
  }

  const [eventData, setEventData] = useState<Event[]>([]);

  const headers: { key: string; label: string }[] = [
    { key: "event_name", label: "Event Name" },
    { key: "event_manager", label: "Event Manager" },
    { key: "location", label: "Location" },
    { key: "date", label: "Date" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status" },
  ];

  useEffect(() => {
    fetch("/api/get_events")
      .then((res) => res.json())
      .then((data) => {
        setEventData(data);
      });
  }
  , []);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", padding: "20px", paddingLeft: "20px" }}>
        <Image src="/images/repair_lab_logo.jpg" alt="logo" width="80" height="80" />
        <h1 style={{ marginLeft: "10px", color: "grey" }}>Event Listings</h1>
      </div>
      <div className="container">

        <table>
          <thead>
            <tr>
              {headers.map((row) => {
                return (
                  <td key={row.key}>
                    {row.label}
                  </td>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {eventData.map((event :Event) => {
              return (
                <tr key={event.name}>
                  <td>{event.name}</td>
                  <td>{event.createdBy}</td>
                  <td>{event.location}</td>
                  <td>{formatDate(String(event.startDate))}</td>
                  <td>{event.eventType}</td>
                  <td>INSERT STATUS</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SortableTable;