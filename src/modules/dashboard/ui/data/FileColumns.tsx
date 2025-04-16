"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { formatDate, formatFileSize } from "@/lib/utils";
import type { FileType } from "@/server/db/schema";
import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<FileType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    maxSize: 24,
  },
  {
    accessorKey: "key",
    header: "Image",
    cell: ({ row }) => (
      <img
        className="h-10 w-10 object-contain"
        src={`https://d1fu8ynlqto67m.cloudfront.net/${String(row.getValue("key"))}`}
        alt="Preview image"
      />
    ),
    maxSize: 24,
    enableSorting: false,
  },
  {
    accessorKey: "filename",
    header: "Filename",
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => formatFileSize(row.getValue("size")),
    enableSorting: true,
  },
  {
    accessorKey: "contentType",
    header: "Content Type",
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
    enableSorting: true,
  },
];
