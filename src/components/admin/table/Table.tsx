import { ReactNode, useMemo } from "react";
import { useTable, Column } from "react-table";
import { v4 } from "uuid";

type Props<D extends object> = {
  data: D[];
  // selectedItems: D[];
  columns: Column<D>[];
  header?: ReactNode;
};

export function Table<D extends object>({
  data: iData,
  columns: iColumns,
  header,
}: Props<D>) {
  const data = useMemo(() => iData, [iData]);
  const columns = useMemo(() => iColumns, [iColumns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ data, columns });

  return (
    <div className="bg-white shadow-admin-lg rounded-sm border border-slate-200 relative">
      {header && (
        <header className="px-5 py-4">
          {header}
        </header>
      )}

      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="table-auto w-full">
            {/* Table header */}
            <thead
              className="text-bo-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t
                border-b border-slate-200"
            >
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={v4()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      key={v4()}
                      className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* Table body */}
            <tbody {...getTableBodyProps()} className="text-bo-sm divide-y divide-slate-200">
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={v4()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()} 
                        key={v4()}
                        className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
