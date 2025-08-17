"use client";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  FormField,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

export default function FoodItemForm({
  initialValues,
  onSubmit,
  userId,
  open,
  setOpen,
  isEdit = false,
  triggerLabel = "Add Menu",
}: {
  userId: number;
  initialValues?: any;
  onSubmit: (data: any) => Promise<void>;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  isEdit?: boolean;
  triggerLabel?: string;
}) {
  const methods = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      selectedFile: null as File | null,
      ...initialValues,
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        name: initialValues.name || "",
        description: initialValues.description || "",
        price: initialValues.price || 0,
        imageUrl: initialValues.imageUrl || "", // Changed to lowercase
        selectedFile: null,
      });
    }
  }, [initialValues, methods]);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [internalDialogOpen, setInternalDialogOpen] = useState(false);

  const handleImageUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", userId.toString());

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const result = await response.json();
        return result.path;
      } catch (error) {
        console.error("Upload error:", error);
        throw error;
      } finally {
        setUploading(false);
      }
    },
    [userId]
  );

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      // If a new file was selected, upload it
      if (data.selectedFile) {
        try {
          const imagePath = await handleImageUpload(data.selectedFile);
          data.imageUrl = imagePath;
        } catch (error) {
          methods.setError("imageUrl", {
            type: "manual",
            message: "Failed to upload image",
          });
          return;
        }
      }

      // If in edit mode and no new file was selected, keep the existing imageUrl
      if (isEdit && !data.selectedFile && initialValues?.imageUrl) {
        data.imageUrl = initialValues.imageUrl;
      }

      await onSubmit({ ...data }); // don't inject userId into payload sent to API
      methods.reset();
      setOpen?.(false);
    } finally {
      setLoading(false);
    }
  };
  const dialogOpen = typeof open === "boolean" ? open : internalDialogOpen;
  const handleDialogOpenChange = (value: boolean) => {
    if (setOpen) setOpen(value);
    else setInternalDialogOpen(value);
  };

  const FormContent = () => {
    const methods = useFormContext();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
      if (initialValues?.imageUrl) {
        setPreviewUrl(initialValues.imageUrl);
      }
    }, [initialValues]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Store the file in form state
      methods.setValue("selectedFile", file);
      methods.setValue("imageUrl", ""); // Clear the URL since we're using a new file

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    };

    return (
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="space-y-4 max-w-md mx-auto"
      >
        <FormField
          name="name"
          control={methods.control}
          rules={{ required: "Name is required" }}
          render={({ field, fieldState }) => (
            <>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={
                    fieldState.error
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }
                />
              </FormControl>
            </>
          )}
        />
        <FormField
          name="description"
          control={methods.control}
          rules={{ required: "Description is required" }}
          render={({ field, fieldState }) => (
            <>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={
                    fieldState.error
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }
                />
              </FormControl>
            </>
          )}
        />
        <FormField
          name="price"
          control={methods.control}
          rules={{ required: "Price is required" }}
          render={({ field, fieldState }) => (
            <>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={
                    fieldState.error
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }
                />
              </FormControl>
            </>
          )}
        />
        <FormField
          name="imageUrl"
          control={methods.control}
          rules={{
            validate: (value) => {
              // Only require image if not in edit mode or if no existing image
              if (!isEdit && !value && !methods.getValues("selectedFile")) {
                return "Image is required";
              }
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <FormLabel>Food Image</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <div className="mt-2">
                    <img
                      src={previewUrl || "/images/placeholder.jpg"}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded-md border"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "/images/placeholder.jpg";
                      }}
                    />
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className={
                      fieldState.error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }
                  />
                  {/* Hidden input to store the actual URL */}
                  <input type="hidden" {...field} />
                </div>
              </FormControl>
            </>
          )}
        />

        <DialogFooter>
          <Button type="submit" disabled={loading || uploading}>
            {loading
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
              ? "Update Menu"
              : "Create Menu"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    );
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
      {!isEdit && (
        <DialogTrigger asChild>
          <Button className="btn btn-primary text-lg">{triggerLabel}</Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update Menu" : "Create Menu"}</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <FormContent />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
