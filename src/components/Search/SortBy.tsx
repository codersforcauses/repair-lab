import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SortByProps {
  options: string[];
}

export default function SortBy({ options }: SortByProps) {
  const [sortAscending, setSortAscending] = useState(true);
  const SortLabel = sortAscending ? TiArrowSortedUp : TiArrowSortedDown;

  return (
    <div>
      <Menu as="div" className="relative w-full p-4 text-left">
        <div className="flex gap-2 h-10">
          <Menu.Button className="w-fit whitespace-nowrap justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-0 hover:bg-gray-50 focus:shadow-md focus:outline-none">
            Sort By:
            <HiOutlineChevronDown
              className="ml-2 h-5 w-5 text-gray-400 inline"
              aria-hidden="true"
            />
          </Menu.Button>
          <button
            className="h-full aspect-square justify-center rounded-md bg-gray-100 text-sm font-semibold text-gray-900 shadow-sm ring-0 hover:bg-gray-50 focus:shadow-md focus:outline-none"
            onClick={() => setSortAscending(!sortAscending)}
          >
            <SortLabel
              className="h-6 w-6 text-gray-400 inline"
              aria-hidden="true"
            />
          </button>
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {options.map((option) => (
                <Menu.Item key={option}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {option}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
