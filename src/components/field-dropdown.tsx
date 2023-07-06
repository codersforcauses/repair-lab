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
  options: {id: number, text: string}[];
}
// needs to be passed fields of dropdown
export default function DropDownField({ selected, setSelected, options }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  // handle function for when a user clicks an option (onClick event)
  // const handleClick = ()
  return (
    <div className="select-none px-10 py-10">
      <button
        className="BUTTON cursor-pointer rounded bg-gray-400 px-2 py-1 font-bold text-black shadow  w-60 h-10"
        onClick={(e) => setIsExpanded(!isExpanded)}
      >
        {selected === "" ? "Dropdown" : selected}
        <span className="fas fa-caret-down"></span>
      </button>
      {isExpanded && (
        <ul className="PANEL rounded bg-gray-200 py-2 font-medium shadow w-60 border absolute">
          {options.map((option) => (
            <li
              onClick={(e) => {
                setSelected(option.text);
                setIsExpanded(false);
              }}
              className=" OPTION cursor-pointer py-2 px-2 hover:bg-blue-400 hover:text-white"
              key={option.id}
            >
              <div className="flex items-center ml-5">
                {option.text}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
