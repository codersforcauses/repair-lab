import { Fragment } from "react";
import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
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
  width?: string;
  height?: string;
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
  width = "w-full",
  height = "h-10",
  ...props
}: FormProps<T>) {
  const { field, fieldState } = useController(props);
  const [displayText, setDisplayText] = useState(field.value?.toString());

  const baseStyle = `flex w-full h-full justify-between overflow-hidden rounded-lg bg-white px-3 py-2 text-base font-medium text-gray-900 shadow-sm ring-1 ring-inset hover:shadow-grey-300`;
  return (
    <FieldWrapper fieldState={fieldState} size={height}>
      <Menu>
        <Menu.Button className={classNames(`${baseStyle}`)}>
          <Label label={!label ? props.name : label} {...props} />
          {fieldState.invalid && <Error {...props} />}
          {field.value === "" ? (
            <span className="text-gray-500 font-normal">
              {!placeholder ? `Select ${props.name}` : `${placeholder}`}
            </span>
          ) : (
            <span className="truncate text-black font-normal">
              {displayText}
            </span>
          )}
          <HiChevronDown
            className="ml-auto h-6 w-5 text-grey-600"
            aria-hidden="true"
          />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 top-8 z-10 mt-2 max-h-60 w-full min-w-min origin-top overflow-auto rounded-md bg-white shadow-lg ring-1 border-grey-300 hover active:shadow-grey-500 ring-grey-500">
            <div className="py-1">
              {options.map((option) => (
                <Menu.Item key={option.id}>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={() => {
                        field.onChange(option.id);
                        setDisplayText(option.text);
                      }}
                      className={classNames(
                        active
                          ? "bg-lightAqua-100 text-grey-900"
                          : "text-grey-900",
                        "block py-2 pl-2 pr-4 text-sm"
                      )}
                    >
                      {option.id === field.value ? (
                        <span className="relative left-0 flex">
                          <HiCheck
                            className="h-5 w-5 text-darkAqua-600"
                            aria-hidden="true"
                          />
                          <span className="pl-2 font-medium">
                            {option.text}
                          </span>
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
    </FieldWrapper>
  );
}
