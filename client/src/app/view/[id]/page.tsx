"use client";
import { Vendor } from "@/types/vendor";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/layout/Loading";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/layout/NavBar";
import {
  GetVendorById,
  UpdateMenu,
  DeleteMenu,
  GetMenusByVendor,
  CreateMenu,
} from "@/lib/api/axios";
import { Menu } from "@/types/menu";
import MenuForm from "@/components/cater/MenuForm";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";

// Dummy data for illustration
const caterer = {
  rating: 4.8,
  description:
    "Specializing in Filipino-Spanish cuisine for weddings, birthdays, and corporate events.",
  coverImages: [
    "/images/fooditems/f7cb14bd-49b5-4e7b-8899-28ccdf769869.jpg",
    "/images/fooditems/e9361d96-c3db-40e2-bc28-8699ac98efd7.jpg",
    "/images/fooditems/74af6abd-e6ff-4a37-8e55-ad53dee078d3.jpg",
  ],
  menus: [
    {
      id: 1,
      name: "Premium Buffet Set",
      image: "/images/fooditems/f7cb14bd-49b5-4e7b-8899-28ccdf769869.jpg",
      description: "A lavish spread of Filipino-Spanish favorites.",
      price: "₱850/head",
    },
    // ...more menus
  ],
  gallery: [
    "/images/fooditems/69438236-9c12-4108-9cda-775253efba98.jpg",
    "/images/fooditems/e9361d96-c3db-40e2-bc28-8699ac98efd7.jpg",
    // ...more images
  ],
  reviews: [
    {
      user: "Jane D.",
      rating: 5,
      comment: "Amazing food and service!",
    },
    // ...more reviews
  ],
};

export default function VendorDetailPage() {
  const { id } = useParams();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [editingItem, setEditingItem] = useState<Menu | null>(null);
  const [deletingItem, setDeletingItem] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (id) {
      GetVendorById(Number(id)).then(setVendor).catch(console.error);
      GetMenusByVendor(Number(id))
        .then(setMenus)
        .catch((error) => {
          // If 404, treat as no food items
          if (error?.response?.status === 404) {
            setMenus([]);
          } else {
            console.error(error);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleCreate = async (data: any) => {
    try {
      const created = await CreateMenu({
        ...data,
        isActive: true,
      });
      setMenus((prev) => [created, ...prev]);
      toast.success("Menu created successfully!");
    } catch (error) {
      toast.error("Failed to create menu.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };




  const handleUpdate = async (data: any) => {
    if (!vendor || !editingItem) {
      toast.error("Vendor or menu is not loaded.");
      return;
    }

    try {
      const updateData = {
        id: editingItem.id,
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        vendorId: vendor.id,
      };

      await UpdateMenu(Number(editingItem.id), updateData);

      setMenus((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...item, ...updateData } : item
        )
      );
      setEditingItem(null);
      toast.success("Menu updated successfully!");
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(`Update failed: ${error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await DeleteMenu(Number(id));
      setMenus((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      toast.success("Menu deleted!");
    } catch (error) {
      toast.error("Failed to delete menu.");
      console.error(error);
    }
  };






  if (isLoading) {
    return <Loading />;
  }
  if (!vendor) return <div />;
  return (
    <main>
      <Navbar />
      {/* Main Layout */}
      <div className="bg-gray-50 min-h-screen pb-32">
        {/* 1. Banner / Cover Image */}
        <section>
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-b-2xl overflow-hidden flex">
            {caterer.coverImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Cover ${idx + 1}`}
                className="object-cover w-full h-full"
              />
            ))}
          </div>
        </section>

        <main className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 flex flex-col gap-8">
            {/* 2. Caterer Info Header */}
            <section className="border-b p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col items-center md:items-start">
                  <img
                    src={vendor.imageUrl || "/images/placeholder.jpg"}
                    alt={vendor.name}
                    className="w-34 h-34 object-cover rounded-lg mb-4"
                    style={{
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    }}
                  />
                  <h1 className="text-2xl font-bold text-gray-900">
                    {vendor.name}
                  </h1>
                  <div className="flex items-center gap-3 mt-2 text-gray-600 text-base">
                    <span>⭐ {caterer.rating}</span>
                    <span>·</span>
                    <span>{vendor.address}</span>
                    <span>·</span>
                    <span>
                      {vendor.isApproved ? (
                        <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                          Not accepting bookings
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. About Section */}
            <section className="border-b p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                About
              </h2>
              <p className="text-gray-600">{caterer.description}</p>
            </section>

            {/* 4. Available Menus / Food Packages */}
            <section className="border-b p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Menus <MenuForm userId={vendor.id} onSubmit={handleCreate} />
              </h2>
              {loading ? (
                <div className="block md:hidden mx-auto max-w-[400px]">
                  <div className="bg-white p-4 space-y-3 rounded-lg animate-pulse">
                    <Skeleton className="h-60 w-full rounded-lg" />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </div>
              ) : error ? (
                <p className="text-red-600">Error: {error}</p>
              ) : menus.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <svg
                    className="w-12 h-12 text-gray-300 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                  >
                    <circle cx="24" cy="24" r="20" strokeWidth="4" />
                    <path
                      d="M16 32h16M16 24h16M16 16h16"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">
                    No Menus Available
                  </h3>
                  <p className="text-gray-500 text-center text-sm">
                    This vendor hasn’t added any menus yet.
                    <br />
                    Please check back soon!
                  </p>
                </div>
              ) : (
                <ul>
                  {menus.map((item) => (
                    <div
                      key={item.id}
                      className="relative rounded-2xl p-2 mt-3 flex flex-row gap-4 items-center"
                    >
                      <img
                        src={item.imageUrl || "/images/placeholder.jpg"}
                        alt={item.name}
                        className="w-1/3 h-30 object-cover rounded-lg"
                        style={{
                          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                        }}
                      />
                      <div className="flex flex-col text-base">
                        <h5 className="text-gray-950 pt-1">{item.name}</h5>
                        <p className="text-gray-500 font-medium text-xs">
                          {item.description}
                        </p>
                        <span className="text-gray-500 font-medium mb-2 text-xs">
                          {item.price}
                        </span>
                        <div className="flex gap-1">
                          {" "}
                          <Button
                            onClick={() => setEditingItem(item)}
                            className="w-24 bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            Update
                          </Button>
                          <Button
                            className="w-24 bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => setDeletingItem(item)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              )}
            </section>

            {/* 5. Photo Gallery */}
            <section className="border-b p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Photo Gallery
              </h2>
              <div className="flex gap-4 overflow-x-auto">
                {caterer.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Event ${idx + 1}`}
                    className="h-28 w-44 object-cover rounded-lg border border-gray-100 shadow-sm"
                  />
                ))}
              </div>
            </section>

            {/* 6. Reviews & Ratings */}
            <section className="border-b p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Reviews & Ratings
              </h2>
              <div className="space-y-4">
                {caterer.reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-xl border border-gray-100 p-4"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-yellow-500">
                        ⭐ {review.rating}
                      </span>
                      <span className="text-gray-700 font-medium">
                        {review.user}
                      </span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 7. Booking Section (Sidebar or Fixed Bottom for Mobile) */}
          <aside className="md:sticky md:top-28">
            <div
              className="bg-white rounded-2xl border border-gray-200 p-6 md:mt-0 mt-8"
              style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Reserve This Caterer
              </h2>
              <form className="space-y-3">
                <label className="block">
                  <span className="text-gray-700 text-sm">Date</span>
                  <input
                    type="date"
                    name="date"
                    className="mt-1 block w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 text-sm">Time</span>
                  <input
                    type="time"
                    name="time"
                    className="mt-1 block w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 text-sm">Headcount</span>
                  <input
                    type="number"
                    name="headcount"
                    min={1}
                    className="mt-1 block w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700 text-sm">Menu</span>
                  <select
                    name="menu"
                    className="mt-1 block w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900"
                  >
                    {caterer.menus.map((menu) => (
                      <option key={menu.id} value={menu.id}>
                        {menu.name}
                      </option>
                    ))}
                  </select>
                </label>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success("Reservation request sent!");
                  }}
                  type="submit"
                  className="w-full"
                >
                  Proceed to Reservation
                </Button>
              </form>
            </div>
          </aside>
        </main>

        {editingItem && (
          <MenuForm
            userId={vendor.id}
            initialValues={editingItem}
            onSubmit={handleUpdate}
            open={!!editingItem}
            setOpen={(open) => !open && setEditingItem(null)}
            isEdit={true}
          />
        )}

        {/* Place the delete confirmation dialog here */}
        <Dialog
          open={!!deletingItem}
          onOpenChange={(open) => {
            if (!open) setDeletingItem(null);
          }}
        >
          <DialogContent>
            <DialogTitle>Delete Menu</DialogTitle>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deletingItem?.name}</strong>?
            </p>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={async () => {
                  if (deletingItem) {
                    await handleDelete(deletingItem.id);
                    setDeletingItem(null);
                  }
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Footer />
    </main>
  );
}
