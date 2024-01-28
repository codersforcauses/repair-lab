import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import { SortDirection } from "@/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SortByProps {
  options: { key: string; label: string }[];
  sortKey: string;
  sortDir: SortDirection;
  onChange?: (sortKey: string, sortDir: SortDirection) => void;
}

export default function SortBy({
  options,
  sortKey,
  sortDir,
  onChange
}: SortByProps) {
  const sortAscending = sortDir == "asc";

  const SortDirectionIcon = sortAscending ? TiArrowSortedUp : TiArrowSortedDown;

  // TODO make this less janky
  const innerOptions = [{ key: "", label: "None" }, ...options];

  const sortLabel = options.find((o) => o.key == sortKey)?.label ?? "Sort By";

  return (
    <div>
      <Menu as="div" className="relative w-full text-left">
        <div className="flex gap-1 h-10">
          <Menu.Button className="w-fit whitespace-nowrap justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-0 hover:bg-gray-50 focus:shadow-md focus:outline-none">
            {sortLabel}
            <HiOutlineChevronDown
              className="ml-2 h-5 w-5 text-gray-400 inline"
              aria-hidden="true"
            />
          </Menu.Button>
          <button
            className="h-full aspect-square justify-center rounded-md bg-gray-100 text-sm font-semibold text-gray-900 shadow-sm ring-0 hover:bg-gray-50 focus:shadow-md focus:outline-none"
            onClick={() =>
              onChange?.(sortKey, sortDir === "asc" ? "desc" : "asc")
            }
          >
            <SortDirectionIcon
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
              {innerOptions.map((option) => (
                <Menu.Item key={option.key}>
                  {({ active }) => (
                    <button
                      onClick={() => onChange?.(option.key, sortDir)}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm w-full text-left"
                      )}
                    >
                      {option.label}
                    </button>
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
