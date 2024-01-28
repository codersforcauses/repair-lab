import { useCallback } from "react";

import Select from "@/components/select";
import cn from "@/lib/classnames";

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
  className?: string;
}

export function Pagination({
  value: paginationState,
  onChange,
  options = DEFAULT_OPTIONS,
  className
}: PaginationProps) {
  const { total, perPage = 20, current = 1 } = paginationState;

  const maxPage = Math.ceil(total / perPage);
  const firstRecord = perPage * (current - 1) + 1;
  const lastRecord = Math.min(perPage * current, total);

  const toPage = useCallback(
    (page: number) => {
      if (page < 1) return 1;
      if (page > maxPage) return maxPage;
      onChange({ ...paginationState, current: page });
    },
    [maxPage, onChange, paginationState]
  );

  const handlePerPageChange = useCallback(
    (perPage: number) => {
      onChange({ ...paginationState, perPage, current: 1 });
    },
    [onChange, paginationState]
  );

  return (
    <div className={cn("mt-2 flex flex-row justify-between", className)}>
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
        <Select
          className="h-8 mr-2"
          value={perPage}
          onChange={handlePerPageChange}
          options={options.map((n) => ({ name: String(n), value: n }))}
        />
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
