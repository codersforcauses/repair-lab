import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { HiCheck, HiChevronDown } from "react-icons/hi";

import Label from "@/components/FormFields/box-label";
import Error from "@/components/FormFields/error-msg";
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

export default function FieldSingleSelect<T extends FieldValues = FieldValues>({
  options: initialOptions,
  placeholder,
  label,
  width = "w-full",
  height = "h-10",
  ...props
}: FormProps<T>) {
  const { field, fieldState } = useController(props);
  const [dynamicOptions, setDynamicOptions] = useState<Option[]>(
    initialOptions.filter((option) => option.id !== "input-box-add")
  );
  const [newItemName, setNewItemName] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [addError, setAddError] = useState("");

  const baseStyle = `flex ${height} ${width} justify-between overflow-hidden rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset hover:shadow-grey-300`;
  const normalBorderStyle = `ring-grey-300`;
  const errorBorderStyle = `ring-red-500`;

  // Adds a new option and updates the options state
  const updateOptions = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Avoid duplicate item to be added to the list
    setAddError(""); // Clear any previous add errors
    if (
      dynamicOptions.some(
        (option) => option.text.toLowerCase() === newItemName.toLowerCase()
      )
    ) {
      // Set an error message if the item already exists
      setAddError("Item already exists");
    } else {
      // Add the new item if it doesn't already exist
      const newItem: Option = {
        id: `added-item-${Date.now()}`,
        text: newItemName
      };
      setDynamicOptions((prevOptions) => [...prevOptions, newItem]);
      setNewItemName("");
    }
  };

  const handleOptionSelect = (option: Option) => {
    setDisplayText(option.text); // Update displayed text
    field.onChange(option.text); // Update form field value
  };

  const removeOption = (id: string) => {
    setDynamicOptions((options) =>
      options.filter((option) => option.id !== id)
    );
  };

  const renderMenuItem = (option: Option) => (
    <Menu.Item key={option.id}>
      {({ active }) => (
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleOptionSelect(option)}
            className={classNames(
              active ? "bg-lightAqua-100 text-grey-900" : "text-grey-900",
              "flex-grow text-left py-2 pl-2 pr-4 text-sm"
            )}
          >
            {option.text === displayText && (
              <HiCheck
                className="inline h-5 w-5 text-green-500 mr-2"
                aria-hidden="true"
              />
            )}
            {option.text}
          </button>
          {typeof option.id === "string" &&
            option.id.startsWith("added-item-") && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent menu close
                  removeOption(option.id as string);
                }}
                className="mx-2 rounded-md bg-red-500 p-2 text-white flex-shrink-0"
                aria-label="Remove item"
              >
                <FaMinus />
              </button>
            )}
        </div>
      )}
    </Menu.Item>
  );

  return (
    <div className={`relative mb-2 inline-block ${width} text-left`}>
      <Menu as="div">
        <div>
          <Menu.Button
            className={classNames(
              baseStyle,
              fieldState.invalid ? errorBorderStyle : normalBorderStyle
            )}
          >
            <Label label={!label ? props.name : label} {...props} />
            {fieldState.invalid && <Error {...props} />}
            <span className="text-gray-500">{displayText || placeholder}</span>
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
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-right overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {dynamicOptions.map(renderMenuItem)}
              <div className="flex px-2 py-2 border-t border-gray-200 items-center">
                <input
                  type="text"
                  value={newItemName}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateOptions(e);
                      e.stopPropagation();
                    }
                  }}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="text-sm border-gray-300 shadow flex-grow p-1"
                  placeholder="Add new item..."
                />
                {addError && (
                  <p className="text-red-500 text-sm ml-2">{addError}</p>
                )}
                <button
                  onClick={updateOptions}
                  className="ml-2 rounded-md bg-blue-500 p-2 text-white flex-shrink-0"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
