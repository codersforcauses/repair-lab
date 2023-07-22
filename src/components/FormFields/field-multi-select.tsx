import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";
import { BsChevronExpand } from "react-icons/bs";
import { HiCheck } from "react-icons/hi";

import Label from "@/components/FormFields/box-label";
import Error from "@/components/FormFields/error-msg";

export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  options: { id: number; text: string }[];
  width?: string;
  height?: string;
  placeholder?: string;
  label?: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/*
This is a component for a multiselect dropdown menu
Will display a multiselect dropdown displaying options inputted
Input:
  options: { id: number; text: string }[]; // array of objects with option text and id number
  placeholder?: string; // placeholder string before any option is selected
  label?: string; // text on border of button
  width?: string; // custom width of component
  height?: string; // custom height of component
Output:
  A multiselect dropdown that is compatible w/ React-hook-forms 
*/

export default function MultiSelect<T extends FieldValues = FieldValues>({
  options,
  placeholder,
  label,
  width = "w-full",
  height = "h-10",
  ...props
}: FormProps<T>) {
  const { field, fieldState } = useController(props);
  const [selectedGroup, setSelectedGroup] = useState<
    { id: number; text: string }[]
  >([]);
  const baseStyle = `flex h-10 ${width} justify-between overflow-hidden rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset hover:shadow-grey-300`;
  const normalBorderStyle = `ring-grey-300`;
  const errorBorderStyle = `ring-red-500`;

  return (
    <div
      className={`relative mb-2 text-left ${width} ${height}`}
      onChange={field.onChange}
    >
      <Listbox
        value={selectedGroup}
        onChange={(e) => {
          field.onChange(e);
          setSelectedGroup(e);
        }}
        multiple
      >
        <div className="relative mt-1">
          <Listbox.Button
            className={classNames(
              `${baseStyle}`,
              `text-left`,
              fieldState.invalid
                ? `${errorBorderStyle}`
                : `${normalBorderStyle}`
            )}
          >
            <Label label={!label ? props.name : label} {...props} />
            {fieldState.invalid && <Error {...props} />}
            <span className="truncate">
              {selectedGroup.length === 0 ? (
                <span className="text-gray-500">
                  {!placeholder ? `Select Items` : `${placeholder}`}
                </span>
              ) : (
                selectedGroup.map((option) => option.text).join(", ")
              )}
            </span>
            <span className="pointer-events-none inset-y-0 right-0 flex items-center pr-0">
              <BsChevronExpand
                className=" h-5 w-5 text-grey-700"
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-grey-800 ring-opacity-10 focus:outline-none sm:text-sm">
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
