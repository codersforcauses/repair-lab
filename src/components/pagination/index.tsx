import { useCallback } from "react";

import Select from "@/components/select";

const DEFAULT_OPTIONS = [10, 20, 50, 100];
export interface PaginationState {
  perPage?: number;
  /** Start from 1 */
  page?: number;
  totalCount: number;
}

export interface PaginationProps {
  value: PaginationState;
  onChange: (nextState: PaginationState) => void;
  options?: number[];
}

export function Pagination({
  value: paginationState,
  onChange,
  options = DEFAULT_OPTIONS
}: PaginationProps) {
  const { totalCount, perPage = 20, page = 1 } = paginationState;

  const maxPage = Math.ceil(totalCount / perPage);
  const firstRecord = perPage * (page - 1) + 1;
  const lastRecord = Math.min(perPage * page, totalCount);

  const toPage = useCallback(
    (page: number) => {
      if (page < 1) return 1;
      if (page > maxPage) return maxPage;
      onChange({ ...paginationState, page: page });
    },
    [maxPage, onChange, paginationState]
  );

  const handlePerPageChange = useCallback(
    (perPage: number) => {
      onChange({ ...paginationState, perPage, page: 1 });
    },
    [onChange, paginationState]
  );

  return (
    <div className="mt-2 flex flex-row justify-between">
      <div className="flex flex-row items-center gap-1 text-sm text-gray-700">
        Showing
        <span className="font-semibold text-gray-900">{firstRecord}</span>
        <span>to</span>
        <span className="font-semibold text-gray-900">{lastRecord}</span>
        of
        <span className="font-semibold text-gray-900">{totalCount}</span>
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
          onClick={() => toPage(page - 1)}
        >
          Prev
        </button>
        <button
          className="flex h-8 items-center justify-center rounded-r border-0 border-l border-white bg-primary-400 px-3 text-sm font-medium text-white hover:bg-gray-900"
          onClick={() => toPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
