import { useState } from "react";
import DropDownField from "@/components/field-dropdown";

export default function Tester() {
  const [selected, setSelected] = useState("");
  return (
    <main>
      <h1>This is the dropdown tester page</h1>
      <DropDownField selected={selected} setSelected={setSelected} />
    </main>
  );
}
