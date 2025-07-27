import { Vendor } from "@/types/vendor";
import { User } from "@/types/users";
import Image from "next/image";
import Link from "next/link";

interface CaterCardProps {
  vendor: Vendor;
}

export default function CaterCard({ vendor }: CaterCardProps) {
  const cardContent = (
    <div className="rounded-2xl bg-white p-2 space-y-3 text-gray-800">
      {/* Optional image or icon */}
      <div
        className="relative h-60 rounded-2xl"
        style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
      >
        <Image
          src={vendor.imageUrl || "/images/placeholder.jpg"}
          alt={vendor.name}
          fill
          priority={true}
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>

      <div className="flex items-center justify-between">
        <h5>{vendor.name}</h5>
        <span
          className={`px-2 py-1 rounded-full ${
            vendor.owner?.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {vendor.owner?.isActive ? "Active" : "Inactive"}
        </span>
      </div>
      <p className="text-gray-600 text-start">{vendor.description}</p>
      {!vendor.owner?.isActive && (
        <p className="text-start">
          <span className="rounded-full bg-gray-800 w-auto text-white px-2 py-1">
            Coming Soon
          </span>
        </p>
      )}
    </div>
  );

  return vendor.owner?.isActive ? (
    <Link
      href={`/view/${vendor.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}
