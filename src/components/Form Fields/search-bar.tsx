import { useState, Dispatch, SetStateAction } from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  setResults: (value: never[]) => void;
}

export default function SearchBar({ setResults }: Props) {
  const [input, setInput] = useState("");
  const fetchData = (value: any) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user: any) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        console.log(results);
      });
  };

  const handleChange = (value: any) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper mb-5 flex h-10 w-full items-center rounded-lg border border-transparent bg-white px-3.5 py-0 shadow">
      <FaSearch id="search-icon" className="text-blue-500" />
      <input
        className=" focus ml-1 flex h-full w-full border-transparent bg-transparent text-lg"
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
