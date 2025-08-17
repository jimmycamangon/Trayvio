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
} from "@tanstack/react-table";
import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu } from "@/types/menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type Props = {
  data: Menu[];
  onEdit?: (m: Menu) => void;
  onDelete?: (m: Menu) => void;
};

export default function MenusTable({ data, onEdit, onDelete }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fmtPrice = (p?: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p ?? 0);

  const openImage = (url?: string | null) => {
    if (!url) return;
    setSelectedImage(url);
    setModalOpen(true);
  };

  const columns: ColumnDef<Menu>[] = [
    {
      id: "thumbnail",
      header: "Image",
      cell: ({ row }) => {
        const url = row.original.imageUrl;
        return url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={row.original.name ?? "menu image"}
            className="w-12 h-12 object-cover rounded-md cursor-pointer border"
            onClick={() => openImage(url)}
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md text-gray-400 text-xs">
            No
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span className="text-sm text-muted-foreground truncate max-w-md">{row.original.description}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>{fmtPrice(row.original.price)}</span>,
    },
    {
      accessorKey: "vendorid",
      header: "Vendor",
      cell: ({ row }) => <span className="text-sm">{row.original.vendorid}</span>,
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
          row.original.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {row.original.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (row.original.createdAt ? new Date(row.original.createdAt).toLocaleDateString() : "-"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit?.(row.original)}>Edit</Button>
          <Button size="sm" variant="destructive" onClick={() => onDelete?.(row.original)}>Delete</Button>
        </div>
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
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search menus..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              aria-label="Search menus"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => table.resetColumnFilters()}>Clear</Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className={`flex items-center gap-2 cursor-pointer ${
                          header.column.getCanSort() ? "hover:text-gray-700 dark:hover:text-gray-300" : ""
                        }`}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
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
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} menus
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

      {/* Image modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Image preview</DialogTitle>
          </DialogHeader>

          <div className="w-full max-w-3xl mx-auto">
            {selectedImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={selectedImage} alt="Menu image" className="w-full h-auto rounded-md object-contain" />
            ) : (
              <div className="h-48 flex items-center justify-center text-gray-500">No image</div>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}