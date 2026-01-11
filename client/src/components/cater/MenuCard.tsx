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
  onEdit,
  onDelete,
}: Menu & {
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const fmtPrice = (p: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p);

  return (
    <article
      className="group relative flex flex-col md:flex-row  gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700 overflow-hidden"
      aria-labelledby={`menu-${id}-title`}
    >
      <div className="relative w-full md:w-40 h-40 md:h-auto flex-shrink-0 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-900">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name ?? "menu image"}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4m-5 4h18" />
            </svg>
          </div>
        )}

        {/* hover action icons (top-right of image) */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="p-1 rounded-full bg-white/80 dark:bg-black/60 shadow-sm"
              onClick={onEdit}
              aria-label={`Edit ${name}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536M4 20h4.586a1 1 0 00.707-.293l9.414-9.414a1 1 0 00-1.414-1.414L7.879 18.293A1 1 0 007.586 18H4v2z" />
              </svg>
            </Button>

            <Button
              size="sm"
              variant="destructive"
              className="p-1 rounded-full"
              onClick={onDelete}
              aria-label={`Delete ${name}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 7h12M9 7v11a2 2 0 002 2h2a2 2 0 002-2V7M10 7V5a2 2 0 012-2h0a2 2 0 012 2v2" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div className="truncate">
            <h3 id={`menu-${id}-title`} className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
              {name}
            </h3>
            {description && <p className="text-sm text-muted-foreground mt-1 truncate">{description}</p>}
          </div>

          <div className="flex flex-col items-end ml-2">
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{fmtPrice(price ?? 0)}</div>
            <span
              className={`mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
              aria-label={isActive ? "Active" : "Inactive"}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <div>
              Vendor:{" "}
              <span className="font-medium text-gray-700 dark:text-gray-200">{vendorid}</span>
            </div>
            {createdAt && <div>Created: {new Date(createdAt).toLocaleDateString()}</div>}
          </div>

          {/* visible action buttons for accessibility / dense view */}
          <div className="hidden md:flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={onEdit} aria-label={`Edit ${name}`}>
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={onDelete} aria-label={`Delete ${name}`}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}