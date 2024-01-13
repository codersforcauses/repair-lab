import { useCallback } from "react";

import Select from "@/components/select";

const DEFAULT_OPTIONS = [10, 20, 50, 100];
export interface PaginationState {
  total: number;
  perPage?: number;
  /** Start from 1 */
  current?: number;
}

export interface PaginationProps {
  value: PaginationState;
  onChange: (nextState: PaginationState) => void;
  options?: number[];
}

export function Pagination(props: PaginationProps) {
  const { value, onChange, options = DEFAULT_OPTIONS } = props;
  const { total, perPage = 20, current = 1 } = value;

  const maxPage = Math.ceil(total / perPage);
  const firstRecord = perPage * (current - 1) + 1;
  const lastRecord = Math.min(perPage * current, total);

  const toPage = useCallback(
    (page: number) => {
      if (page < 1) return 1;
      if (page > maxPage) return maxPage;
      onChange({ ...value, current: page });
    },
    [maxPage, onChange, value]
  );

  const handlePerPageChange = useCallback(
    (perPage: number) => {
      onChange({ ...value, perPage, current: 1 });
    },
    [onChange, value]
  );

  return (
    <div className="mt-2 flex flex-row justify-between">
      <div className="flex flex-row items-center gap-1 text-sm text-gray-700">
        Showing
        <span className="font-semibold text-gray-900">{firstRecord}</span>
        <span>to</span>
        <span className="font-semibold text-gray-900">{lastRecord}</span>
        of
        <span className="font-semibold text-gray-900">{total}</span>
        Entries
      </div>
      <div className="inline-flex">
        <div className="pr-2">
          <Select
            height="h-8"
            value={perPage}
            onChange={handlePerPageChange}
            options={options.map((n) => ({ name: String(n), value: n }))}
          />
        </div>
        <button
          className="flex h-8 items-center justify-center rounded-l bg-primary-400 px-3 text-sm font-medium text-white hover:bg-gray-900"
          onClick={() => toPage(current - 1)}
        >
          Prev
        </button>
        <button
          className="flex h-8 items-center justify-center rounded-r border-0 border-l border-white bg-primary-400 px-3 text-sm font-medium text-white hover:bg-gray-900"
          onClick={() => toPage(current + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
