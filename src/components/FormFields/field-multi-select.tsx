import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiCheck } from "react-icons/hi";
import { BsChevronExpand } from "react-icons/bs";
import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";

import Label from "@/components/FormFields/box-label";
import Error from "@/components/FormFields/error-msg";

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" }
];

interface Props {
  options: { id: number; text: string }[];
  width?: string;
  placeholder?: string;
  label?: string;
}

export default function MultiSelect({
  options,
  width = "w-full",
  label,
  ...props
}: Props) {
  const [selectedGroup, setSelectedGroup] = useState<
    { id: number; text: string }[]
  >([]);
  const sampleOptionsOn: boolean = true;
  const baseStyle = `flex h-10 ${width} justify-between overflow-hidden rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset hover:shadow-grey-300`;
  const normalBorderStyle = `ring-grey-300`;
  const errorBorderStyle = `ring-red-500`;

  return (
    <div className="fixed top-16 w-72">
      <Listbox value={selectedGroup} onChange={setSelectedGroup} multiple>
        <div className="relative mt-1">
          <Listbox.Button
            className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            placeholder="select"
          >
            <Label label={!label ? props.name : label} {...props} />
            <span className="block truncate">
              {selectedGroup.length === 0 ? (
                <div className="text-grey-500">
                  select multiple eg. Option1, Option2
                </div>
              ) : (
                selectedGroup.map((option) => option.text).join(", ")
              )}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-grey-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-lightAqua-100 text-grey-900"
                        : "text-grey-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.text}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lightAqua-600">
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
