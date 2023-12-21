import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchBarProps {
  onSearchChange?: (searchText: string) => void;
  onButtonClick?: (searchText: string) => void;
  className?: string;
}

/**
 * The button will not be clickable if an onButtonClick event isn't provided
 */
export default function SearchBar({
  onSearchChange,
  onButtonClick,
  className
}: SearchBarProps) {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <div className={className}>
      <div className="relative z-10 w-full text-gray-600 h-10 rounded-3xl border-none bg-gray-100 text-sm">
        <input
          className="w-full h-full bg-transparent rounded-[inherit] px-5 py-2 focus:shadow-md focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            onSearchChange?.(e.target.value);
          }}
        />
        <button
          className={`absolute right-4 top-2/4 -translate-y-2/4 transform text-gray-500 ${
            onButtonClick ? "" : "pointer-events-none"
          }`}
          onClick={() => onButtonClick?.(searchText)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}
