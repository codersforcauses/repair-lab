import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";

import Select from "@/components/select";
import { SortDirection } from "@/types";

interface SortByProps {
  options: { key: string; label: string }[];
  sortKey: string;
  sortDir: SortDirection;
  onChange?: (sortKey: string, sortDir: SortDirection) => void;
}

export default function SortBy({
  options,
  sortKey,
  sortDir,
  onChange
}: SortByProps) {
  const sortAscending = sortDir == "asc";

  const SortDirectionIcon = sortAscending ? FaSortUp : FaSortDown;

  // This adds a none option that just deselects
  const innerOptions = [{ key: "", label: "None" }, ...options];

  return (
    <div>
      <div className="flex gap-1 h-10">
        <Select
          className="w-36"
          label="Sort by"
          // TODO: fix options mapping weird
          options={innerOptions.map((x) => ({ name: x.label, value: x.key }))}
          value={sortKey}
          onChange={(value) => onChange?.(value, sortDir)}
        />
        <button
          className="relative flex items-center h-10 w-8 justify-between rounded-lg bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-primary-500 hover:shadow-grey-300"
          onClick={() =>
            onChange?.(sortKey, sortDir === "asc" ? "desc" : "asc")
          }
        >
          <FaSort className="h-6 w-6 text-gray-400 inline absolute opacity-30 left-1/2 -translate-x-1/2" />
          <SortDirectionIcon
            className="h-6 w-6 text-gray-400 absolute left-1/2 -translate-x-1/2"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
