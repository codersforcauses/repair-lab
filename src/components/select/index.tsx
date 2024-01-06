import { Fragment, useCallback, useMemo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiCheck, HiChevronDown } from "react-icons/hi";

import cn from "@/lib/classnames";
import isBlank from "@/lib/is-blank";

type SelectValueType<
  Value,
  Option,
  Mutiple extends boolean,
  UseOption extends boolean
> = Mutiple extends true
  ? UseOption extends true
    ? Option[]
    : Value[]
  : UseOption extends true
    ? Option
    : Value;

export interface SelectProps<
  Option extends Record<NameKey | ValueKey, unknown>,
  Multiple extends boolean = false,
  UseOption extends boolean = false,
  NameKey extends string = "name",
  ValueKey extends string = "value",
  SelectValue = SelectValueType<Option[ValueKey], Option, Multiple, UseOption>
> {
  label?: string;
  multiple?: Multiple;
  /** if true, the value will be option instead of value of option */
  useOption?: UseOption;
  options?: Option[];
  value?: SelectValue;
  onChange?: (value: SelectValue) => void;
  width?: string;
  height?: string;
  placeholder?: string;
  renderSelected?: (
    values: SelectValue,
    options: Option[],
    onChange?: (value: SelectValue) => void
  ) => JSX.Element;
  renderOption?: (option: Option) => JSX.Element;
  onSearch?: (search: string) => void;
  nameKey?: NameKey;
  valueKey?: ValueKey;
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
  Option extends Record<NameKey | ValueKey, unknown>,
  Multiple extends boolean = false,
  UseOption extends boolean = false,
  NameKey extends string = "name",
  ValueKey extends string = "value",
  SelectValue = SelectValueType<Option[ValueKey], Option, Multiple, UseOption>
>(
  props: SelectProps<
    Option,
    Multiple,
    UseOption,
    NameKey,
    ValueKey,
    SelectValue
  >
) {
  const {
    label,
    multiple = false,
    useOption = false,
    options = [],
    value = [] as SelectValue,
    onChange,
    width = "w-full",
    height = "h-10",
    placeholder = "Please select",
    renderSelected,
    renderOption,
    onSearch,
    nameKey = "name" as NameKey,
    valueKey = "value" as ValueKey
  } = props;

  const baseStyle = `flex items-center ${height} ${width} justify-between overflow-hidden rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset hover:shadow-grey-300`;
  const normalBorderStyle = `ring-grey-300`;

  const selectedOptions = useMemo(() => {
    const optionsOrValues = [...(Array.isArray(value) ? value : [value])];
    return optionsOrValues.map((OptionOrValue) =>
      useOption
        ? OptionOrValue // Value is option
        : options.find((option) => option[valueKey] === OptionOrValue)
    ) as Option[];
  }, [value, useOption, options, valueKey]);

  const handleChange = useCallback(
    (options: Option | Option[]) => {
      if (useOption) {
        onChange?.(options as SelectValue);
      } else if (multiple) {
        const values = (options as Option[]).map((option) => option[valueKey]);
        onChange?.(values as SelectValue);
      } else {
        onChange?.((options as Option)[valueKey] as SelectValue);
      }
    },
    [useOption, multiple, onChange, valueKey]
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
          ) : renderSelected ? (
            renderSelected(value, options, onChange)
          ) : (
            <span className="truncate text-grey-900">
              {selectedOptions?.map((option) => option[nameKey]).join(", ")}
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
                <Listbox.Option
                  key={`${option[valueKey]}`}
                  value={option}
                  as={Fragment}
                >
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
                            {`${option[nameKey] ?? option[valueKey]}`}
                          </span>
                        </span>
                      ) : (
                        <span className="pl-7">{`${
                          option[nameKey] ?? option[valueKey]
                        }`}</span>
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

// export const renderUserTag: SelectProps<User>["renderSelected"] = (value, options:User[], onChange) => {
//   return (
//     <div className="flex flex-col">
//       {options.map((user: User, index) => {
//         user = user as User;
//         return (
//           <div
//             key={user.id}
//             className="flex h-5/6 p-1 bg-gray-200 rounded-sm ml-1 mr-1"
//           >
//             <div className="h-full aspect-square rounded-full block mr-2 overflow-hidden flex-grow-0 flex-shrink-0">
//               <Image
//                 src="/images/repair_lab_logo.png"
//                 width={30}
//                 height={30}
//                 alt="repair-labs"
//                 className="h-full object-cover  "
//               />
//             </div>{" "}
//             <div className="block overflow-hidden text-clip whitespace-nowrap">
//               {user.firstName} {user.lastName}
//             </div>
//             <HoverOpacityButton
//               className="text-gray-500 text-xs hover:enabled:scale-100 ml-2 hover:opacity-60"
//               onClick={() => {
//                 removeUserByIndex(index);
//               }}
//             >
//               <FontAwesomeIcon icon={faXmark} />
//             </HoverOpacityButton>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
