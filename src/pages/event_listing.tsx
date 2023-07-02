import { MouseEventHandler, useCallback, useState } from "react";
import data from "./data.json";

type Data = typeof data;

type SortKeys = keyof Data[0];

type SortOrder = "ascn" | "desc";

function sortData({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: Data;
  sortKey: SortKeys;
  reverse: boolean;
}) {
  if (!sortKey) return tableData;

  const sortedData = data.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}


function SortableTable({ data }: { data: Data }) {

  const headers: { key: SortKeys; label: string }[] = [
    { key: "event_name", label: "EVENT NAME" },
    { key: "event_manager", label: "EVENT MANAGER" },
    { key: "location", label: "Location" },
    { key: "date", label: "Date" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status" },
  ];

  const [sortKey, setSortKey] = useState<SortKeys>("event_name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  const sortedData = useCallback(
    () => sortData({ tableData: data, sortKey, reverse: sortOrder === "desc" }),
    [data, sortKey, sortOrder]
  );

  function changeSort(key: SortKeys) {

    setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn')

    setSortKey(key);

  }
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", padding: "20px", paddingLeft: "20px" }}>
        <img src="/images/repair_lab_logo.jpg" alt="Event Image" style={{ width: "80px", height: "auto" }} />
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
            {sortedData().map((event) => {
              return (
                <tr key={event.event_name}>
                  <td>{event.event_name}</td>
                  <td>{event.event_manager}</td>
                  <td>{event.location}</td>
                  <td>{event.date}</td>
                  <td>{event.type}</td>
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

export default SortableTable;