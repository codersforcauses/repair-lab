import { useCallback } from "react";

import HoverOpacityButton from "@/components/Button/hover-opacity-button";
import Select from "@/components/select";
import cn from "@/lib/classnames";

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
  className?: string;
  disabled?: boolean;
}

export function Pagination({
  value: paginationState,
  onChange,
  options = DEFAULT_OPTIONS,
  className,
  disabled = false
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
    <div className={cn("mt-2 flex flex-row justify-between", className)}>
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
        <HoverOpacityButton
          className="flex h-8 items-center justify-center rounded-l bg-primary-500 px-3 text-sm font-medium text-white"
          scaleOnHover={false}
          onClick={() => toPage(page - 1)}
          disabled={disabled || page <= 1}
        >
          Prev
        </HoverOpacityButton>
        <HoverOpacityButton
          className="flex h-8 items-center justify-center rounded-r border-0 border-l border-white bg-primary-500 px-3 text-sm font-medium text-white"
          scaleOnHover={false}
          onClick={() => toPage(page + 1)}
          disabled={disabled || page >= maxPage}
        >
          Next
        </HoverOpacityButton>
      </div>
    </div>
  );
}
