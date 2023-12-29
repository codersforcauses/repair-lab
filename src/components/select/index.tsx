import { Fragment, useCallback, useMemo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiCheck, HiChevronDown } from "react-icons/hi";

import cn from "@/lib/classnames";
import isBlank from "@/lib/is-blank";

export type IdType = string | number;

export interface Option<T extends IdType = IdType> {
  id: T;
  text: string;
}

type SelectValue<
  O extends IdType,
  M extends boolean,
  R extends boolean
> = M extends true
  ? R extends true
    ? O[]
    : Option<O>[]
  : R extends true
    ? O
    : Option<O>;

export interface SelectProps<
  O extends IdType,
  M extends boolean,
  R extends boolean
> {
  label?: string;
  multiple?: M;
  /** if true, the value will be the id of the option */
  useIdValue?: R;
  options?: Option<O>[];
  value?: SelectValue<O, M, R>;
  onChange?: (value: SelectValue<O, M, R>) => void;
  width?: string;
  height?: string;
  placeholder?: string;
}

/**
 * Select component (Nonstable)
 * test page: http://localhost:3000/tests/select_component
 * ref: https://headlessui.com/react/listbox
 * todo: support error state
 * todo: merge with FieldSelct
 * todo: optimise animation
 */
export default function Select<
  O extends IdType,
  M extends boolean = false,
  R extends boolean = false
>(props: SelectProps<O, M, R>) {
  const {
    label,
    multiple = false,
    useIdValue = false,
    options = [],
    value,
    onChange,
    width = "w-full",
    height = "h-10",
    placeholder = "Please select"
  } = props;

  const baseStyle = `flex items-center ${height} ${width} justify-between overflow-hidden rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset hover:shadow-grey-300`;
  const normalBorderStyle = `ring-grey-300`;

  const selectedOptions = useMemo(() => {
    const optionsOrIds = (value && !Array.isArray(value) ? [value] : value) as
      | SelectValue<O, M, R>[]
      | undefined;
    if (!optionsOrIds) return [];
    return optionsOrIds.map((optionOrId) =>
      useIdValue
        ? options.find((option) => option.id === optionOrId)
        : optionOrId
    ) as Option<O>[];
  }, [options, value, useIdValue]);

  const handleChange = useCallback(
    (values: Option<O>[] | Option<O>) => {
      if (!useIdValue) {
        onChange?.(values as SelectValue<O, M, R>);
      } else if (multiple) {
        const ids = (values as Option<O>[]).map(
          (option) => option.id
        ) as SelectValue<O, M, R>;
        onChange?.(ids);
      } else {
        onChange?.((values as Option<O>).id as SelectValue<O, M, R>);
      }
    },
    [onChange, multiple, useIdValue]
  );

  return (
    <div className={`relative mb-2 inline-block ${width} text-left`}>
      <Listbox
        value={selectedOptions}
        onChange={handleChange}
        multiple={multiple}
      >
        <Listbox.Button
          as="button"
          className={cn(
            `${baseStyle}`,
            normalBorderStyle
            // fieldState.invalid
            //   ? `${errorBorderStyle}`
            //   : `${normalBorderStyle}`,
          )}
        >
          <label className="absolute -top-2 left-2 flex flex-row items-center gap-0.5 rounded-full bg-white px-1 text-xs font-semibold text-black">
            {label}
            {/* {props.rules?.required ? (
                <span className="text-xs font-semibold text-red-500"> *</span>
              ) : (
                ""
              )} */}
          </label>

          {/* {fieldState.invalid && <Error {...props} />} */}
          {isBlank(value) ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            <span className="truncate text-grey-900">
              {selectedOptions?.map((option) => option.text).join(", ")}
            </span>
          )}
          <HiChevronDown
            className="ml-auto h-6 w-5 text-grey-600"
            aria-hidden="true"
          />
        </Listbox.Button>
        <Transition
          className="z-10 relative"
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Listbox.Options className="absolute left-0 z-10 mt-2 max-h-60 w-full min-w-min origin-top overflow-auto rounded-md bg-white shadow-lg ring-1 ring-grey-800 ring-opacity-10 focus:outline-none">
            <div className="py-1">
              {options.map((option) => (
                <Listbox.Option key={option.id} value={option} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={cn(
                        active
                          ? "bg-lightAqua-100 text-grey-900"
                          : "text-grey-900",
                        "block py-2 pl-2 pr-4 text-sm"
                      )}
                    >
                      {selected ? (
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
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </div>
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}
