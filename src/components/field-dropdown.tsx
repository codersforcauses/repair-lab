import { useState, ChangeEvent } from "react";

// things that might need to be customizable: size of dropdown,

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
  const borderStyle = "1px solid rgb(161 182 191)";
  return (
    <div
      style={{
        position: "absolute",
        top: "-5px",
        left: "10px",
        width: `${size}px`,
        height: `${size}px`,
        transform: "rotate(45deg)",
        backgroundColor: "rgb(241 250 250)",
        borderLeft: borderStyle,
        borderTop: borderStyle
      }}
    ></div>
  );
};

const DownTriangle = ({ size }: { size: number }) => {
  const borderStyle = `${size}px solid transparent`;
  return (
    <div
      style={{
        position: "absolute",
        top: "150px",
        left: `400px`,
        width: `${size}px`,
        height: `${size}px`,
        borderLeft: borderStyle,
        borderRight: borderStyle,
        borderTop: `${size}px solid rgb(41 163 157)`
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
  return (
    <div className="select-none px-20 py-20">
      <p className="text-sm">Click to select an option</p>
      <div className="flex h-8 w-fit cursor-pointer flex-wrap justify-start rounded border border-grey-400 px-2 py-0 font-semibold text-blue-500 shadow">
        <button className="" onClick={(e) => setIsExpanded(!isExpanded)}>
          {selected === "" ? (
            <span className="opacity-70">-select-</span>
          ) : (
            selected
          )}
          <DownTriangle size={10} />
        </button>
      </div>

      {isExpanded && (
        <ul className="PANEL border-1 absolute mt-2 flex flex-col rounded border border-grey-300 bg-lightAqua-50 py-2 font-medium shadow">
          <UpTriangle size={10} />
          {options.map((option) => (
            <li
              onClick={() => {
                setSelected(option.text);
                setIsExpanded(false);
              }}
              className=" OPTION cursor-pointer px-2 py-2 hover:bg-darkAqua-500 hover:text-white"
              key={option.id}
            >
              <div className="ml-5 flex w-20 min-w-min flex-wrap items-center">
                {option.text}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
