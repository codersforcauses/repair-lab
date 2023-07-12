import { useState } from "react";
import Dropdown from "@/components/Form Fields/dropdown-headless";
import Field_Radio from "@/components/Form Fields/field-radio";
import SearchBar from "@/components/Form Fields/search-bar"
export default function Tester() {
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState([])
  return (
    <main>
      <h1>This is the dropdown tester page</h1>
      <p>content above</p>
      <div className="App m-0 h-full w-full bg-grey-50 p-0">
        <div className="search-bar-container m-auto flex w-1/3 min-w-min flex-col items-center pt-20">
          <SearchBar setResults={setResults} />
        </div>
      </div>
      <div className="flex justify-center flex-col">
        
        <Dropdown
          selected={selected}
          setSelected={setSelected}
          // width={80}
          placeholder="Select an Item"
          header="header"
          required={true}
          options={[
            {
              id: 0,
              text: "Option1"
            },
            {
              id: 1,
              text: "Option2"
            },
            {
              id: 2,
              text: "Option3"
            },
            {
              id: 3,
              text: "LongerOption4"
            },
            {
              id: 4,
              text: "EvenLongerOption5"
            },
            {
              id: 5,
              text: "Option6"
            },
            {
              id: 6,
              text: "Option7"
            },
            {
              id: 7,
              text: "A really really long option for the purpose of testing"
            }
          ]}
        />
        {/* <Field_Radio label="a label"  /> */}
      </div>
      <p>content below</p>
      <p className="flex justify-center">more content below</p>
    </main>
  );
}
