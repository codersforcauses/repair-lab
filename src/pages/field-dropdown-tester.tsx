import { useState } from "react";
import DropDownField from "@/components/field-dropdown";
import Dropdown from "@/components/dropdown_headless";

export default function Tester() {
  const [selected, setSelected] = useState("");
  return (
    <main>
      <h1>This is the dropdown tester page</h1>
      <p>content above</p>
      <DropDownField
        selected={selected}
        setSelected={setSelected}
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
      <Dropdown />
      <p>content below</p>
    </main>
  );
}
