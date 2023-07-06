import { useState } from "react";

/*
This is a component for the HTML `<select>' tag
Will display a dropdown displaying options
Input:
  label: The label displayed on the text box
  options: array of options to display
Output:
  An input dropdown option box compatible w/ React-hook-forms 
*/

interface Props {
  selected: string;
  setSelected: (value: string) => void;
}
// needs to be passed fields of dropdown
export default function DropDownField({ selected, setSelected }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const options = [
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
    }
  ];
  // handle function for when a user clicks an option (onClick event)
  // const handleClick = ()
  return (
    <div className="select-none px-10 py-10">
      <button
        className="BUTTON cursor-pointer rounded bg-green-300 px-2 py-1 font-bold text-black shadow outline outline-2 outline-green-600 w-80 h-10"
        onClick={(e) => setIsExpanded(!isExpanded)}
      >
        {selected === "" ? "Dropdown" : selected}
        <span className="fas fa-caret-down"></span>
      </button>
      {isExpanded && (
        <div className="PANEL flex flex-col items-start rounded bg-green-200  py-2 font-medium shadow w-80 border">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option.text);
                setIsExpanded(false);
              }}
              className=" OPTION flex cursor-pointer py-2 hover:bg-green-400 w-80 rounded"
              key={option.id}
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
