import { useState } from "react";

import { User } from "@/types";

export type FilterType = "daterange" | "option" | "user";

export type DateFilterData = { startDate: string; endDate: string };

type UserFilter = {
  type: "user";
  filter: User[];
};
type DateFilter = {
  type: "daterange";
  filter: DateFilterData;
};
type OptionFilter = {
  type: "option";
  filter: string[];
  options: string[];
};

type Filter = UserFilter | DateFilter | OptionFilter;

export const useTableFilters = () => {
  const [columnFilters, setColumnFilters] = useState<
    Partial<Record<string, Filter>>
  >({});

  function initialiseColumnFilter(
    column: string,
    type: FilterType,
    options?: string[]
  ) {
    setColumnFilters((currentFilters) => {
      const newFilters = { ...currentFilters };
      if (type === "option" && options)
        newFilters[column] = { type, options, filter: options };
      else if (type === "daterange")
        newFilters[column] = {
          type: type,
          filter: { startDate: "", endDate: "" }
        };
      else if (type === "user") {
        newFilters[column] = {
          type: type,
          filter: []
        };
      }
      return newFilters;
    });
  }

  function updateColumnFilter(
    column: string,
    newFilter: User[] | DateFilterData | string[]
  ) {
    setColumnFilters((currentFilters) => {
      const newFilters = { ...currentFilters };
      const existing = newFilters[column];

      if (existing) {
        if (Array.isArray(existing.filter) && Array.isArray(newFilter)) {
          existing.filter = newFilter;
        } else if (
          typeof existing.filter === "object" &&
          "startDate" in existing.filter &&
          "endDate" in existing.filter &&
          typeof newFilter === "object" &&
          "startDate" in newFilter &&
          "endDate" in newFilter
        ) {
          existing.filter = newFilter;
        } else {
          throw new Error("Filter type mismatch");
        }

        newFilters[column] = existing;
      }
      return newFilters;
    });
  }

  const resetFilters = () => {
    setColumnFilters((currentFilters) => {
      const newFilters = Object.entries(currentFilters).reduce<
        Partial<Record<string, Filter>>
      >((acc, cur) => {
        const newFilter = cur[1];
        if (!newFilter) return acc;

        if (newFilter.type === "user") newFilter.filter = [];
        else if (newFilter.type === "daterange")
          newFilter.filter = { startDate: "", endDate: "" };
        else if (newFilter.type === "option")
          newFilter.filter = [...newFilter.options];
        acc[cur[0]] = newFilter;
        return acc;
      }, {});
      return newFilters;
    });
  };

  const isFilterActive = (column: string): boolean | undefined => {
    const filter = columnFilters?.[column];
    if (!filter) return;

    switch (filter.type) {
      case "daterange":
        return (
          filter.filter.startDate.length !== 0 ||
          filter.filter.endDate.length !== 0
        );
      case "user":
        return filter.filter.length !== 0;
      default:
        return !filter.options.every((element) =>
          filter.filter.includes(element)
        );
    }
  };

  return {
    columnFilters,
    initialiseColumnFilter,
    updateColumnFilter,
    resetFilters,
    isFilterActive
  };
};
