import { useState } from "react";

export default function SearchBar({ setResults }) {
  const [searchItem, setSearchItem] = useState("");

  const fetchData = (value: string) => {
    fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
      response.json().then((json) => {
        const results = json.filter((user: any) => {
          return user && user.name && user.name.toLowerCase().includes(value);
        });
        setResults(results);
      })
    );
  };

  const handleChange = (value: string) => {
    setSearchItem(value);
    fetchData(value);
  };

  return (
    <div className="rounded-full border p-2">
      <input
        placeholder="Search..."
        className="focus:outline-none"
        value={searchItem}
        onChange={(e) => handleChange(e.target.value)}
      ></input>
      <button>Submit</button>
    </div>
  );
}
