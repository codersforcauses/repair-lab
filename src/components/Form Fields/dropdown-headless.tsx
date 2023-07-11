import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiChevronDown, HiCheck } from "react-icons/hi";

interface Props {
  selected: string;
  setSelected: (value: string) => void;
  options: { id: number; text: string }[];
  width?: number;
  height?: number;
  required?: boolean;
  placeholder?: string;
  header?: string;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

/*
This is a component for a dropdown menu
Will display a dropdown displaying options inputted
Input:
  selected: string; // useState variable to hold last clicked on option
  setSelected: (value: string) => void; // function to update useState variable
  options: { id: number; text: string }[]; // array of objects with option text and id number
  width?: number; // width of button, doesnt work
  height?: number; // height of button, doesnt work
  required?: boolean; // whether field is required or not
  placeholder: string; // placeholder string before any option is selected
  header?: string; // text on border of button
Output:
  A dropdown that is compatible w/ React-hook-forms 
*/

export default function DropDown({
  options,
  selected,
  setSelected,
  width = 80,
  height = 10,
  required = false,
  placeholder = "-select-",
  header = ""
}: Props) {
  return (
    <Menu as="div" className="relative inline-block pb-4 text-left">
      <div>
        <Menu.Button
          className={classNames(
            `flex h-10 w-full justify-between gap-x-1.5 overflow-hidden rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-grey-300 hover:shadow-grey-300 `
          )}
        >
          {header !== "" ? (
            required === false ? (
              <span className="absolute -top-3 flex items-center justify-center bg-white px-2 py-1 text-xs text-black ">
                {header}
              </span>
            ) : (
              <span className="absolute -top-3 flex items-center justify-center bg-white px-2 py-1 text-xs text-black">
                {header}
                <div className="text-red-500">*</div>
              </span>
            )
          ) : (
            ""
          )}

          {selected === "" ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            <span className="truncate text-grey-900">{selected}</span>
          )}
          <HiChevronDown
            className="ml-auto h-6 w-5 text-grey-600"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute left-0 z-10 mt-2 min-w-min w-full origin-top overflow-auto rounded-md bg-grey-50 shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none`}
        >
          <div className="py-1">
            {options.map((option) => (
              <Menu.Item key={option.id}>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => {
                      setSelected(option.text);
                    }}
                    className={classNames(
                      active ? "bg-darkAqua-400 text-white" : "text-grey-800",
                      "block py-2 pl-2 pr-4 text-sm"
                    )}
                  >
                    {option.text === selected ? (
                      <span className="relative left-0 flex ">
                        <HiCheck
                          className={classNames(
                            "h-5 w-5",
                            active ? "text-white" : "text-darkAqua-600"
                          )}
                          aria-hidden="true"
                        />
                        <span className="pl-2">{option.text}</span>
                      </span>
                    ) : (
                      <span className="pl-7">{option.text}</span>
                    )}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
