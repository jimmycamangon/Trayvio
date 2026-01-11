"use client";

type Vendor = {
  id: number;
  ownerId: number;
};

type MenuFormData = {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  selectedFile: File | null;
  userId?: number;
};

type ApiError = {
  response?: {
    status?: number;
    data?: unknown;
  };
  message?: string;
};
type AuthUser = {
  id?: number;
  vendorId?: number;
  vendor?: { id?: number };
};

import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/layout/Loading";
// remove this line:
// import MenuCard from "@/components/cater/MenuCard";
import MenuForm from "@/components/cater/MenuForm";
import { Skeleton } from "@/components/ui/skeleton";
// vendor state removed; we'll use authenticated user instead
import { useState, useEffect, useCallback } from "react";
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
import MenusTable from "@/components/cater/MenusTable";

export default function MenuBuilderPage() {
  const { id } = useParams();
  const { user, isLoading } = useAuth();
  const authUser = user as AuthUser | null;
  const authUserId = authUser?.id;
  const [menus, setMenus] = useState<Menu[]>([]);
  const [editingItem, setEditingItem] = useState<Menu | null>(null);
  const [deletingItem, setDeletingItem] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);

  // compute active vendor id from route or user (adjust shape if your user has vendorId)
  const resolveVendorId = useCallback((): number => {
    if (id) return Number(id);

    const u = user as AuthUser | null;
    return Number(u?.vendorId ?? u?.vendor?.id ?? NaN);
  }, [id, user]);

  // attempt to resolve vendorId; if missing, try to find a vendor where ownerId === user.id
  const ensureVendorId = useCallback(async (): Promise<number | null> => {
    let vId = resolveVendorId();
    if (!vId || Number.isNaN(vId)) {
      try {
        const ownerId = Number(authUserId);

        const vendors: Vendor[] = await GetVendors();
        const match = vendors.find((v) => Number(v.ownerId) === ownerId);

        if (match) vId = Number(match.id);
      } catch (err) {
        console.warn("Failed to fetch vendors to resolve vendorId", err);
      }
    }
    return vId || null;
  }, [authUserId, resolveVendorId]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const vendorId = await ensureVendorId();
      console.debug("MenuBuilderPage: ensured vendorId =", vendorId);
      if (!vendorId || Number.isNaN(vendorId)) {
        console.warn(
          "MenuBuilderPage: no vendor id available, skipping menus fetch"
        );
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
      } catch (error: unknown) {
        const err = error as ApiError;

        if (err.response?.status === 404) {
          setMenus([]);
        } else {
          console.error("Failed to fetch menus:", err);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [ensureVendorId]);

  const handleCreate = async (data: MenuFormData) => {
    try {
      // Resolve vendor id reliably (route > user.vendorId > vendor lookup)
      const vendorId = await ensureVendorId();
      if (!vendorId) {
        console.error("Cannot create menu: vendorId unresolved", {
          user,
          routeId: id,
        });
        toast.error("Unable to determine vendor. Please check your account.");
        return;
      }
      const { selectedFile, ...rest } = data;
      void selectedFile;

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
    } catch (error: unknown) {
      const err = error as ApiError;
      // Prefer logging the server response body if available
      console.error("CreateMenu error:", err);
      if (err.response) {
        console.error("Server response:", err.response.data ?? err.response);
      }
      toast.error("Failed to create menu. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: MenuFormData) => {
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
    } catch (error: unknown) {
      console.error("Update error:", error);
      toast.error(`Update failed: ${error}`);
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
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm border dark:border-gray-700 flex items-center justify-between">
        <h1 className="text-2xl font-display font-semibold text-gray-900 dark:text-white">
          Menu Builderrrr
        </h1>

        <div className="flex items-center gap-2">
          {/* Create trigger (MenuForm contains an internal trigger by default) */}
          <MenuForm
            userId={Number(authUser?.id)}
            onSubmit={handleCreate}
            isEdit={false}
            triggerLabel="Add Menu"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm border dark:border-gray-700">
        {/* Table view (search / sort / pagination) */}
        <MenusTable
          data={menus}
          onEdit={(m) => setEditingItem(m)}
          onDelete={(m) => setDeletingItem(m)}
        />
      </div>

      {/* controlled edit form */}
      {editingItem && (
        <MenuForm
          userId={Number(authUser?.id)}
          initialValues={editingItem}
          onSubmit={handleUpdate}
          open={!!editingItem}
          setOpen={(open) => {
            if (!open) setEditingItem(null);
          }}
          isEdit={true}
        />
      )}

      {/* delete confirmation dialog */}
      <Dialog
        open={!!deletingItem}
        onOpenChange={(open) => {
          if (!open) setDeletingItem(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Menu</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            Delete <strong>{deletingItem?.name}</strong>?
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
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
