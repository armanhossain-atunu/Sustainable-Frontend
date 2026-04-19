"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { getClientApiBaseUrl } from "@/lib/api";

type Product = {
  _id: string;
  title: string;
  category?: string;
  price?: number;
  status?: string;
  date?: string;
};

export default function AdminProductTable({
  products,
}: {
  products: Product[];
}) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${getClientApiBaseUrl()}/products/${id}`, {
        method: "DELETE",
        headers: session?.user?.token
          ? { Authorization: `Bearer ${session.user.token}` }
          : {},
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to delete product");
      }

      toast.success("Product deleted successfully.");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="overflow-x-auto rounded-3xl border border-base-300 bg-base-100 shadow-sm">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="font-semibold">{product.title}</td>
              <td>{product.category || "Uncategorized"}</td>
              <td>${Number(product.price ?? 0).toFixed(2)}</td>
              <td className="capitalize">{product.status || "upcoming"}</td>
              <td>{product.date || "N/A"}</td>
              <td>
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/product/${product._id}`}
                    className="btn btn-ghost btn-sm"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/products/${product._id}`}
                    className="btn btn-outline btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-error btn-sm text-white"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
