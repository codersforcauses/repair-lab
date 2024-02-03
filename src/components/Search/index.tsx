import { type ReactNode, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useDebounceFn from "@/hooks/debounce-fn";
import cn from "@/lib/classnames";

import styles from "./index.module.css";

export interface SearchProps {
  className?: string;
  value?: string;
  /**
   * onChange is designed able to accept promise for async process like changing url state
   * example: src/pages/events/index.tsx
   */
  onChange?: (value: string) => void | Promise<unknown>;
  beforeInput?: ReactNode;
}

export function Search({
  className,
  value,
  onChange,
  beforeInput
}: SearchProps) {
  const [tempValue, setTempValue] = useState<string>();
  const debounceSearch = useDebounceFn(async (value: string) => {
    await onChange?.(value);
    setTempValue(undefined);
  });
  const hasValue = !!tempValue || !!value;

  return (
    <div className={cn("relative group", className, styles.search)}>
      {beforeInput}
      <input
        className="h-10 w-full rounded-3xl border-none bg-gray-100 px-4 py-2 text-sm focus:shadow-md focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
        value={tempValue ?? value ?? ""}
        onChange={(event) => {
          const value = event.target.value;
          if (value) {
            setTempValue(value);
            debounceSearch(value);
          } else {
            debounceSearch.cancel();
            setTempValue(undefined);
            onChange?.(value);
          }
        }}
      />
      <div
        className={cn(
          "absolute right-5 top-1/2 -translate-y-1/2 transform text-gray-500",
          {
            "group-focus-within:invisible": !!hasValue,
            "group-hover:invisible": !!hasValue
          }
        )}
      >
        <FontAwesomeIcon icon={faSearch} width={20} height={20} />
      </div>
    </div>
  );
}

export default Search;
