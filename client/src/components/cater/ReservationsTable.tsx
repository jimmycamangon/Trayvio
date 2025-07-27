"use client";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

// In your ReservationsTable.tsx
type Reservation = {
    id: number;
    eventName: string;
    date: string;
    guests: number;
    menu: string;
    status: 'confirmed' | 'modification_requested' | string; // Add string fallback
  };

export function ReservationsTable({ data }: { data: Reservation[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<Reservation>[] = [
    {
      accessorKey: 'eventName',
      header: 'Event',
      cell: ({ row }) => <span className="font-medium">{row.original.eventName}</span>,
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'guests',
      header: 'Guests',
    },
    {
      accessorKey: 'menu',
      header: 'Menu',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.original.status === "confirmed"
            ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
            : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300"
        }`}>
          {row.original.status.replace("_", " ")}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          placeholder="Search reservations..."
          value={(table.getColumn('eventName')?.getFilterValue() as string) ?? ''}
          onChange={(e) => table.getColumn('eventName')?.setFilterValue(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id} 
                    className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    <div
                      onClick={header.column.getToggleSortingHandler()}
                      className={`flex items-center cursor-pointer ${
                        header.column.getCanSort() ? 'hover:text-gray-700 dark:hover:text-gray-300' : ''
                      }`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ChevronUp className="ml-1 h-4 w-4" />,
                        desc: <ChevronDown className="ml-1 h-4 w-4" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map(row => (
              <tr 
                key={row.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {table.getRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} reservations
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded-lg disabled:opacity-50 dark:border-gray-700"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded-lg disabled:opacity-50 dark:border-gray-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}