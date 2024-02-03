import { FaSort,FaSortUp,FaSortDown } from "react-icons/fa";
import {
  flexRender,
  getCoreRowModel,
  TableOptions,
  useReactTable
} from "@tanstack/react-table";

import LoadingSpinner from "@/components/UI/loading-spinner";
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
                      <FaSort className="inline-flex text-lightAqua-400 h-4"/>

                    ),
                    asc: (
                      <FaSortUp className="inline-flex text-lightAqua-400 h-4"/>
                    ),
                    desc: (
                      <FaSortDown className="inline-flex text-lightAqua-400 h-4"/>
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
              <LoadingSpinner />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
