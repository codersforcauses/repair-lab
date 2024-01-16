import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";

import cn from "@/lib/classnames";

export interface SearchProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  beforeInput?: ReactNode;
  afterInput?: ReactNode;
}

export function Search({
  className,
  value,
  onChange,
  beforeInput,
  afterInput
}: SearchProps) {
  return (
    <div className={cn("relative", className)}>
      {beforeInput}
      <input
        className="h-10 w-full rounded-3xl border-none bg-gray-100 px-5 py-2 text-sm focus:shadow-md focus:outline-none "
        type="search"
        name="search"
        placeholder="Search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
      {afterInput}
    </div>
  );
}

export function SearchButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      className={cn(
        "absolute right-8 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500",
        { "pointer-events-none": !onClick }
      )}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faSearch} />
    </button>
  );
}

export default Search;
