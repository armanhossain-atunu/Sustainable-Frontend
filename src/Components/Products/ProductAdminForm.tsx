"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

import { useImageUrl } from "@/Hooks/useImageUrl";
import { getClientApiBaseUrl } from "@/lib/api";

type ProductFormValues = {
  title: string;
  slug: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  venue: string;
  organizer: string;
  organizerContact: string;
  image: string;
  gallery: string[];
  category: string;
  price: number;
  discountPrice: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  isFeatured: boolean;
};

type ProductAdminFormProps = {
  mode: "create" | "edit";
  productId?: string;
  initialValues?: Partial<ProductFormValues>;
};

const defaultValues: ProductFormValues = {
  title: "",
  slug: "",
  description: "",
  date: "",
  startTime: "",
  endTime: "",
  location: "",
  venue: "",
  organizer: "",
  organizerContact: "",
  image: "",
  gallery: [],
  category: "",
  price: 0,
  discountPrice: 0,
  status: "upcoming",
  isFeatured: false,
};

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function ProductAdminForm({
  mode,
  productId,
  initialValues,
}: ProductAdminFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { uploadImage, uploadImages, uploading, error } = useImageUrl();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProductFormValues>({
    ...defaultValues,
    ...initialValues,
    gallery: initialValues?.gallery ?? [],
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    setFormData((current) => {
      if (name === "title") {
        return {
          ...current,
          title: value,
          slug: generateSlug(value),
        };
      }

      if (type === "checkbox" && event.target instanceof HTMLInputElement) {
        return {
          ...current,
          [name]: event.target.checked,
        };
      }

      return {
        ...current,
        [name]: type === "number" ? Number(value) : value,
      };
    });
  };

  const handleThumbnailUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const uploadedUrl = await uploadImage(file);
      setFormData((current) => ({
        ...current,
        image: uploadedUrl,
      }));
      toast.success("Thumbnail uploaded to ImgBB.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Thumbnail upload failed";
      toast.error(message);
    } finally {
      event.target.value = "";
    }
  };

  const handleGalleryUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length === 0) return;

    try {
      const uploadedUrls = await uploadImages(files);
      setFormData((current) => ({
        ...current,
        gallery: [...current.gallery, ...uploadedUrls],
      }));
      toast.success("Gallery images uploaded to ImgBB.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gallery upload failed";
      toast.error(message);
    } finally {
      event.target.value = "";
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormData((current) => ({
      ...current,
      gallery: current.gallery.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.image) {
      toast.error("Please upload a product thumbnail image.");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint =
        mode === "create"
          ? `${getClientApiBaseUrl()}/products`
          : `${getClientApiBaseUrl()}/products/${productId}`;

      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(session?.user?.token
            ? { Authorization: `Bearer ${session.user.token}` }
            : {}),
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Request failed");
      }

      toast.success(
        mode === "create"
          ? "Product created successfully."
          : "Product updated successfully.",
      );
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
          Admin Product Manager
        </p>
        <h1 className="mt-2 text-3xl font-bold text-base-content">
          {mode === "create" ? "Add a new product" : "Update product details"}
        </h1>
        <p className="mt-3 text-sm text-base-content/60">
          Upload thumbnail and gallery images directly to ImgBB before saving the product.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
        <label className="form-control md:col-span-2">
          <span className="label-text mb-2 font-medium">Title</span>
          <input
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered"
          />
        </label>

        <label className="form-control md:col-span-2">
          <span className="label-text mb-2 font-medium">Slug</span>
          <input
            required
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="input input-bordered"
          />
        </label>

        <label className="form-control md:col-span-2">
          <span className="label-text mb-2 font-medium">Description</span>
          <textarea
            required
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="textarea textarea-bordered"
          />
        </label>

        <div className="form-control md:col-span-2">
          <span className="label-text mb-2 font-medium">Product Thumbnail</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
            className="file-input file-input-bordered w-full"
          />
          {formData.image ? (
            <div className="mt-4 relative h-52 overflow-hidden rounded-2xl border border-base-300 bg-base-200">
              <Image
                src={formData.image}
                alt="Product thumbnail"
                fill
                className="object-cover"
              />
            </div>
          ) : null}
        </div>

        <div className="form-control md:col-span-2">
          <span className="label-text mb-2 font-medium">Gallery Images</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryUpload}
            className="file-input file-input-bordered w-full"
          />
          {formData.gallery.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {formData.gallery.map((galleryImage, index) => (
                <div
                  key={`${galleryImage}-${index}`}
                  className="rounded-2xl border border-base-300 bg-base-200 p-3"
                >
                  <div className="relative mb-3 h-36 overflow-hidden rounded-xl">
                    <Image
                      src={galleryImage}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="btn btn-error btn-xs w-full text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <label className="form-control">
          <span className="label-text mb-2 font-medium">Category</span>
          <input
            required
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input input-bordered"
          />
        </label>

        <label className="form-control">
          <span className="label-text mb-2 font-medium">Price</span>
          <input
            required
            min="0"
            step="0.01"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input input-bordered"
          />
        </label>

        <label className="form-control">
          <span className="label-text mb-2 font-medium">Discount Price</span>
          <input
            min="0"
            step="0.01"
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            className="input input-bordered"
          />
        </label>

        <label className="form-control">
          <span className="label-text mb-2 font-medium">Date</span>
          <input
            required
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered"
          />
        </label>

        <label className="form-control">
          <span className="label-text mb-2 font-medium">Status</span>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select select-bordered"
          >
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>

        <label className="form-control">
          <span className="label-text mb-2 font-medium">Start Time</span>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="input input-bordered"
          />
        </label>

        <label className="form-control">
          <span className="label-text mb-2 font-medium">End Time</span>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="input input-bordered"
          />
        </label>

        <label className="form-control">
          <span className="label-text mb-2 font-medium">Location</span>
          <input
            required
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered"
          />
        </label>

        <label className="form-control">
          <span className="label-text mb-2 font-medium">Venue</span>
          <input
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="input input-bordered"
          />
        </label>

        <label className="form-control">
          <span className="label-text mb-2 font-medium">Organizer</span>
          <input
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            className="input input-bordered"
          />
        </label>

        <label className="form-control">
          <span className="label-text mb-2 font-medium">Organizer Contact</span>
          <input
            name="organizerContact"
            value={formData.organizerContact}
            onChange={handleChange}
            className="input input-bordered"
          />
        </label>

        <label className="label cursor-pointer justify-start gap-3 md:col-span-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
          <span className="label-text">Mark as featured product</span>
        </label>

        {uploading ? (
          <div className="alert alert-info md:col-span-2">
            <span>Uploading image to ImgBB...</span>
          </div>
        ) : null}

        {error ? (
          <div className="alert alert-error md:col-span-2">
            <span>{error}</span>
          </div>
        ) : null}

        <div className="flex justify-end gap-3 md:col-span-2">
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard")}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || uploading}
            className="btn btn-primary"
          >
            {isSubmitting
              ? mode === "create"
                ? "Creating..."
                : "Updating..."
              : mode === "create"
                ? "Create Product"
                : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
