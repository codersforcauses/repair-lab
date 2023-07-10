import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface Props {
  selected: string;
  setSelected: (value: string) => void;
  options: { id: number; text: string }[];
  width?: number;
  height?: number;
  required?: boolean;
  placeholder: string;
  header?: string;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDown({
  options,
  selected,
  setSelected,
  width = 56,
  height = 20,
  required = false,
  placeholder = "-select-",
  header = ""
}: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={`flex justify-between w-${width} h-${height} gap-x-1.5 overflow-hidden rounded-md bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-grey-50`}
        >
          {header !== "" ? (
            required === false ? (
              <span className="justify center absolute -top-3 flex items-center bg-white px-2 py-1 text-xs text-grey-700">
                {header}
              </span>
            ) : (
              <span className="justify center absolute -top-3 flex items-center bg-white px-2 py-1 text-xs text-grey-700">
                {header}
                <div className="text-red-500">*</div>
              </span>
            )
          ) : (
            ""
          )}

          {selected === "" ? (
            <span className="opacity-70">{placeholder}</span>
          ) : (
            <p className="truncate text-grey-700">{selected}</p>
          )}
          <div className="-mr-1 h-5 w-5 text-grey-700">{"\u2304"}</div>
          {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
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
          className={`absolute left-0 z-0 mt-2 origin-top-right rounded-md bg-grey-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-${width}`}
        >
          <div className="py-1">
            {options.map((option) => (
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => {
                      setSelected(option.text);
                    }}
                    className={classNames(
                      active ? "bg-darkAqua-400 text-white" : "text-grey-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {option.text}
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
