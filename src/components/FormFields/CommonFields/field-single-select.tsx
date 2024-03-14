import { Fragment } from "react";
import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";
import { HiCheck, HiChevronDown } from "react-icons/hi";

import Label from "@/components/FormFields/box-label";
import Error from "@/components/FormFields/error-msg";
import FieldWrapper from "@/components/FormFields/field-wrapper";
import { Option } from "@/types";

export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  options: Option[];
  size?: string;
  placeholder?: string;
  label?: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/** 
This is a component for a dropdown menu that will display a dropdown displaying options inputted
  @param {{id: number text: string}} options  Array of objects with option text and id number
  @param {string} placeholder  placeholder string before any option is selected
  @param {string} label text on border of button
  @returns A dropdown that is compatible w/ React-hook-forms 
*/

export default function FieldSingleSelect<T extends FieldValues = FieldValues>({
  options,
  placeholder,
  label,
  size = "h-10 w-full",
  ...props
}: FormProps<T>) {
  const { field, fieldState } = useController(props);
  const [selectedOption, setSelectedOption] = useState(field.value || "");

  const baseStyle = `flex w-full h-full justify-between text-left overflow-hidden rounded-lg bg-white px-3 py-2 text-base font-medium text-grey-900 shadow-sm ring-0 hover:shadow-grey-300 focus:ring-0 focus:outline-none focus:shadow-grey-300 transition-all duration-150 ease-in-out`;
  return (
    <FieldWrapper fieldState={fieldState} size={size}>
      <Label label={!label ? props.name : label} {...props} />
      <Listbox
        value={selectedOption}
        onChange={setSelectedOption}
        name={field.name}
      >
        <Listbox.Button className={classNames(`${baseStyle}`)}>
          {selectedOption || placeholder || "Select an option"}
          <HiChevronDown
            className="ml-auto h-6 w-5 text-grey-600"
            aria-hidden="true"
          />
        </Listbox.Button>
        {fieldState.invalid && <Error {...props} />}

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Listbox.Options className="absolute left-0 top-8 z-10 mt-2 max-h-60 w-full min-w-min origin-top overflow-auto rounded-md bg-white shadow-lg ring-0 ring-grey-500 focus:ring-0 focus:outline-none border border-grey-300">
            {options.map((option) => (
              <Listbox.Option
                key={option.id}
                value={option.text}
                className="hover:bg-lightAqua-100 cursor-pointer relative"
              >
                {({ active, selected }) => {
                  return (
                    <span
                      className={classNames(
                        selected
                          ? "font-semibold"
                          : active
                            ? "bg-lightAqua-100"
                            : "text-grey-900",
                        "truncate flex flex-row justify-between w-full py-2 px-3 text-grey-900"
                      )}
                    >
                      {option.text}
                      {selected && <HiCheck />}
                    </span>
                  );
                }}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </FieldWrapper>
  );
}
