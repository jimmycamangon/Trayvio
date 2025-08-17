"use client";

import { Menu } from "@/types/menu";
import { Button } from "@/components/ui/button";

export default function MenuCard({
  id,
  vendorid,
  name,
  description,
  price,
  imageUrl,
  isActive,
  createdAt,
  updatedAt,
  onEdit,
  onDelete,
}: Menu & {
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const fmtPrice = (p: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p);

  return (
    <div className="flex items-start gap-4 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm border dark:border-gray-700">
      <div className="w-28 h-20 md:w-36 md:h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-900">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name ?? "menu image"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4m-5 4h18"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="truncate">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
              {name}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1 truncate">
                {description}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end space-y-2">
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {fmtPrice(price ?? 0)}
            </div>
            <div
              className={`text-xs px-2 py-0.5 rounded-full ${
                isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <div>Vendor: {vendorid}</div>
            {createdAt && <div>Created: {new Date(createdAt).toLocaleDateString()}</div>}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="px-3 py-1 text-sm"
              onClick={onEdit}
              aria-label={`Edit ${name}`}
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              className="px-3 py-1 text-sm"
              onClick={onDelete}
              aria-label={`Delete ${name}`}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}