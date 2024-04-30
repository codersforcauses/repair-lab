import { type ReactNode, useState } from "react";
import { FaSearch } from "react-icons/fa";

import useDebounceFn from "@/hooks/debounce-fn";
import cn from "@/lib/classnames";

import styles from "./index.module.css";

export interface SearchProps {
  className?: string;
  value?: string;
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
  const onSearch = useDebounceFn(async (value: string) => {
    await onChange?.(value);
    setTempValue(undefined);
  });

  return (
    <div className={cn("relative group", className, styles.search)}>
      {beforeInput}
      <input
        className="h-10 w-full rounded-3xl border-none bg-gray-100 px-4 py-2 text-sm focus:shadow-md focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
        value={tempValue ?? value}
        onChange={(event) => {
          setTempValue(event.target.value);
          onSearch(event.target.value);
        }}
      />
      <div
        className={cn(
          "absolute right-5 top-1/2 -translate-y-1/2 transform text-gray-500",
          {
            "group-focus-within:invisible": !!value,
            "group-hover:invisible": !!value
          }
        )}
      >
        <FaSearch />
      </div>
    </div>
  );
}

export default Search;
