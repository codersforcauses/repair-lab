import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";
import { HiCheck, HiChevronDown } from "react-icons/hi";

import Label from "@/components/Form Fields/box-label";
import Error from "@/components/Form Fields/error-msg";

export interface FormProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  options: { id: number; text: string }[];
  width?: string;
  placeholder?: string;
  label?: string;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

/*
This is a component for a dropdown menu
Will display a dropdown displaying options inputted
Input:
  options: { id: number; text: string }[]; // array of objects with option text and id number
  placeholder: string; // placeholder string before any option is selected
  label?: string; // text on border of button
Output:
  A dropdown that is compatible w/ React-hook-forms 
*/

export default function DropDown<T extends FieldValues = FieldValues>({
  options,
  placeholder = "-select-",
  label,
  width = "full",
  ...props
}: FormProps<T>) {
  const { field, fieldState } = useController(props);

  return (
    <div className="relative mb-2 inline-block w-full text-left">
      <Menu>
        <div>
          <Menu.Button
            className={classNames(
              `flex h-10 w-${width} justify-between overflow-hidden rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset hover:shadow-grey-300`,
              fieldState.invalid ? "ring-red-500" : "ring-grey-300"
            )}
          >
            <Label label={!label ? props.name : label} {...props} />
            {fieldState.invalid && <Error {...props} />}

            {field.value === "" ? (
              <span className="text-gray-500">{placeholder}</span>
            ) : (
              <span className="truncate text-grey-900">{field.value}</span>
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
          <Menu.Items className="absolute left-0 z-10 mt-2 w-full min-w-min origin-top overflow-auto rounded-md bg-grey-50 shadow-lg ring-1 ring-grey-300 focus:outline-none">
            <div className="py-1">
              {options.map((option) => (
                <Menu.Item key={option.id}>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={() => field.onChange(option.text)}
                      className={classNames(
                        active ? "bg-darkAqua-400 text-white" : "text-grey-800",
                        "block py-2 pl-2 pr-4 text-sm"
                      )}
                    >
                      {option.text === field.value ? (
                        <span className="relative left-0 flex">
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
    </div>
  );
}
