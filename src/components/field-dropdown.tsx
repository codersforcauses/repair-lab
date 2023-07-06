import { useState } from "react";

/*
This is a component for the HTML `<select>' tag
Will display a dropdown displaying options
Input:
  selected: currently selected option
  setSelected: function to update selected variable
  options: array of options to display
Output:
  A dropdown option box compatible w/ React-hook-forms 
*/

interface Props {
  selected: string;
  setSelected: (value: string) => void;
  options: { id: number; text: string }[];
}

const UpTriangle = ({ size }: { size: number }) => {
  const borderStyle = "1px solid rgb(209, 213, 219)";
  return (
    <div
      style={{
        position: "absolute",
        top: "-5px",
        left: "10px",
        width: `${size}px`,
        height: `${size}px`,
        transform: "rotate(45deg)",
        // backgroundColor: "turquoise",
        backgroundColor: "rgb(229 231 235)",
        borderLeft: borderStyle,
        borderTop: borderStyle
      }}
    ></div>
  );
};

// needs to be passed fields of dropdown
export default function DropDownField({
  selected,
  setSelected,
  options
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  // handle function for when a user clicks an option (onClick event)
  const handleClick = (txt: string) => {
    return (
      <>
        onClick=
        {() => {
          setSelected(txt);
          setIsExpanded(false);
        }}
      </>
    );
  };
  return (
    <div className="select-none px-10 py-10">
      <button
        className="BUTTON h-10 w-32 cursor-pointer rounded bg-gray-400 px-2 py-1 font-bold text-black shadow"
        onClick={(e) => setIsExpanded(!isExpanded)}
      >
        {selected === "" ? "Dropdown" : selected}
        <span className="fas fa-caret-down"></span>
      </button>
      {isExpanded && (
        <ul className="PANEL absolute mt-2 w-40 rounded border border-gray-300 bg-gray-200 py-2 font-medium shadow">
          <UpTriangle size={10} />
          {options.map((option) => (
            <li
              {...handleClick(option.text)}
              className=" OPTION cursor-pointer px-2 py-2 hover:bg-blue-400 hover:text-white"
              key={option.id}
            >
              <div className="ml-5 flex items-center">{option.text}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
