import { useState } from "react";

interface Props {
  selected: string;
  setSelected: (value: string) => void;
}
// needs to be passed fields of dropdown
export default function DropDownField({ selected, setSelected }: Props) {
  const [isActive, setIsActive] = useState(false);
  const options = ["React", "Vue", "Angular"];

  // const handleClick = ()
  return (
    <div className="select-none">
      <div
        className="flex w-96 cursor-pointer items-center justify-between rounded-lg bg-green-400 px-2.5 py-1 font-bold text-black shadow-2xl outline outline-2 outline-green-600"
        onClick={(e) => setIsActive(!isActive)}
      >
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="flex flex-col items-center justify-between rounded-sm bg-green-200 px-2 py-1 font-medium text-black shadow-2xl ">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              className="w-96 cursor-pointer p-2.5 hover:bg-green-400"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
