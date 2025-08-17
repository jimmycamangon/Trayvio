"use client";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/layout/Loading";
import MenuCard from "@/components/cater/MenuCard";
import MenuForm from "@/components/cater/MenuForm";
import { Skeleton } from "@/components/ui/skeleton";
// vendor state removed; we'll use authenticated user instead
import { useState, useEffect } from "react";
import {
  UpdateMenu,
  DeleteMenu,
  CreateMenu,
  GetMenusByVendor,
  GetVendors,
} from "@/lib/api/axios";
import { Menu } from "@/types/menu";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function MenuBuilderPage() {
  const { id } = useParams();
  const { user, isLoading } = useAuth();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [editingItem, setEditingItem] = useState<Menu | null>(null);
  const [deletingItem, setDeletingItem] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);

  // compute active vendor id from route or user (adjust shape if your user has vendorId)
  const resolveVendorId = () => {
    if (id) return Number(id);
    const u = (user as any) ?? {};
    // prefer explicit vendorId on the user object or nested vendor.id
    return Number(u.vendorId ?? u.vendor?.id ?? NaN);
  };

  // attempt to resolve vendorId; if missing, try to find a vendor where ownerId === user.id
  const ensureVendorId = async (): Promise<number | null> => {
    let vId = resolveVendorId();
    if (!vId || Number.isNaN(vId)) {
      console.debug("No vendorId from route/user — trying vendor lookup for user", user);
      try {
        const vendors = await GetVendors();
        const ownerId = Number((user as any)?.id);
        const match = vendors.find((v: any) => Number(v.ownerId) === ownerId);
        if (match) vId = Number(match.id);
      } catch (err) {
        console.warn("Failed to fetch vendors to resolve vendorId", err);
      }
    }
    console.debug("Resolved vendorId =", vId);
    return vId || null;
  };
  
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const vendorId = await ensureVendorId();
      console.debug("MenuBuilderPage: ensured vendorId =", vendorId);
      if (!vendorId || Number.isNaN(vendorId)) {
        console.warn("MenuBuilderPage: no vendor id available, skipping menus fetch");
        if (mounted) {
          setMenus([]);
          setLoading(false);
        }
        return;
      }

      try {
        // log to help debug incorrect id (user vs vendor)
        console.debug("Fetching menus for vendorId:", vendorId);
        const result = await GetMenusByVendor(vendorId);
        if (mounted) setMenus(result);
      } catch (error: any) {
        if ((error as any)?.response?.status === 404) {
          if (mounted) setMenus([]);
        } else {
          console.error("Failed to fetch menus:", error);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id, user]);

  const handleCreate = async (data: any) => {
    try {
      // Resolve vendor id reliably (route > user.vendorId > vendor lookup)
      const vendorId = await ensureVendorId();
      if (!vendorId) {
        console.error("Cannot create menu: vendorId unresolved", { user, routeId: id });
        toast.error("Unable to determine vendor. Please check your account.");
        return;
      }
      // remove File objects / transient fields that shouldn't be serialized
      const { selectedFile, userId: _userId, ...rest } = data;
 
      const payload = {
        ...rest,
        vendorId,
        isActive: true,
        price: data.price !== undefined ? Number(data.price) : 0,
        imageUrl: data.imageUrl ?? "",
      };
      console.debug("Creating menu with payload:", payload);
      // include vendorId resolved from route or user
      const created = await CreateMenu(payload);
      setMenus((prev) => [created, ...prev]);
      toast.success("Menu created successfully!");
    } catch (error: any) {
      // Prefer logging the server response body if available
      console.error("CreateMenu error:", error);
      if (error.response) {
        console.error("Server response:", error.response.data ?? error.response);
      }
      toast.error("Failed to create menu. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: any) => {
    if (!editingItem) {
      toast.error("Menu is not loaded.");
      return;
    }

    try {
      const updateData = {
        id: editingItem.id,
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        vendorId: resolveVendorId(),
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

  if (isLoading || !user) return <Loading />;
  if (loading) {
    return (
      <div className="p-4">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full" />
      </div>
    );
  }
  // vendor removed — if menus empty show message below instead

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm border dark:border-gray-700">
        <h1 className="text-2xl font-display font-semibold text-gray-900 dark:text-white">
          Menu Builder
          {user.fullName}
        </h1>

        {/* Add Menu trigger (shows Add Menu button) */}
        <div className="mt-4">
          <MenuForm
            userId={Number((user as any).id)}
            onSubmit={handleCreate}
            isEdit={false}
            triggerLabel="Add Menu"
          />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm border dark:border-gray-700">
        {menus.length === 0 ? (
          <div className="text-sm text-muted-foreground">No menus found.</div>
        ) : (
          menus.map((m) => (
            <MenuCard
              key={m.id}
              {...m}
              onEdit={() => setEditingItem(m)}
              onDelete={() => setDeletingItem(m)}
            />
          ))
        )}
      </div>

      {/* Edit form (controlled) */}
      {editingItem && (
        <MenuForm
          userId={Number((user as any).id)}
          initialValues={editingItem}
          onSubmit={handleUpdate}
          open={!!editingItem}
          setOpen={(open) => {
            if (!open) setEditingItem(null);
          }}
          isEdit={true}
        />
      )}

      {/* Delete confirmation */}
      <Dialog open={!!deletingItem} onOpenChange={(open) => { if (!open) setDeletingItem(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Menu</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            Are you sure you want to delete <strong>{deletingItem?.name}</strong>?
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="mr-2">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={async () => {
                if (!deletingItem) return;
                await handleDelete(String(deletingItem.id));
                setDeletingItem(null);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
