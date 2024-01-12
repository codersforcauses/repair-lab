"use client";
import {
  faSort,
  faSortDown,
  faSortUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  flexRender,
  getCoreRowModel,
  TableOptions,
  useReactTable
} from "@tanstack/react-table";

import cn from "@/lib/classnames";

interface ExtraProps {
  loading?: boolean;
}

const EMPTY_ARRAY: [] = [];

type PartPartial<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

type TableProps<RecordType> = PartPartial<
  TableOptions<RecordType>,
  "data" | "getCoreRowModel"
> &
  ExtraProps;

export default function Table<RecordType = unknown>(
  props: TableProps<RecordType>
) {
  const loading = props.loading;

  const defaultedColumns = props.columns?.map((column) => ({
    enableSorting: false,
    ...column
  }));

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    ...props,
    data: Array.isArray(props.data) ? props.data : EMPTY_ARRAY,
    columns: defaultedColumns
  });

  return (
    <table className="w-full h-full table-auto overflow-hidden rounded-lg">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            className="border-b bg-lightAqua-200 pb-10 text-left "
          >
            {headerGroup.headers.map(
              ({ id, column, isPlaceholder, getContext }) => (
                <th
                  key={id}
                  className="p-2.5 pl-5 font-normal"
                  onClick={column.getToggleSortingHandler()}
                >
                  {isPlaceholder
                    ? null
                    : flexRender(column.columnDef.header, getContext())}
                  {{
                    true: (
                      <FontAwesomeIcon
                        icon={faSort}
                        className="pl-2 text-lightAqua-400"
                      />
                    ),
                    asc: (
                      <FontAwesomeIcon
                        icon={faSortUp}
                        className="pl-2 text-lightAqua-600"
                      />
                    ),
                    desc: (
                      <FontAwesomeIcon
                        icon={faSortDown}
                        className="pl-2 text-lightAqua-600"
                      />
                    )
                  }[(column.getIsSorted() || column.getCanSort()) as string] ??
                    null}
                </th>
              )
            )}
          </tr>
        ))}
      </thead>
      <tbody className={cn("bg-secondary-50")}>
        {!loading ? (
          table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className="first:ml-50 border-b p-2.5 last:mr-10 even:bg-slate-100 hover:bg-slate-200 text-sm font-light"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="p-2.5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })
        ) : (
          <tr>
            <td>
              <div>loading...</div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
