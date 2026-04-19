import Link from "next/link";

import AdminProductTable from "@/Components/Dashboard/AdminProductTable";
import { requireAdmin } from "@/lib/auth";
import { getServerApiBaseUrl } from "@/lib/api";

type Product = {
  _id: string;
  title: string;
  category?: string;
  price?: number;
  status?: string;
  date?: string;
  isFeatured?: boolean;
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${getServerApiBaseUrl()}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const result = await response.json();
  return Array.isArray(result?.data) ? result.data : [];
}

export default async function AdminDashboardPage() {
  const user = await requireAdmin();
  const products = await getProducts();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-base-300 bg-base-100 p-8 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            Admin Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold text-base-content">
            Product control center
          </h1>
          <p className="mt-3 text-base-content/70">
            Signed in as {user.email}. Manage products, update listings, and keep the catalog current.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/addProduct" className="btn btn-primary">
            Add Product
          </Link>
          <Link href="/" className="btn btn-ghost">
            View Storefront
          </Link>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/60">Total Products</p>
          <p className="mt-2 text-3xl font-bold">{products.length}</p>
        </div>
        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/60">Featured</p>
          <p className="mt-2 text-3xl font-bold">
            {products.filter((product) => product.isFeatured).length}
          </p>
        </div>
        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/60">Active Statuses</p>
          <p className="mt-2 text-3xl font-bold">
            {products.filter((product) => product.status && product.status !== "cancelled").length}
          </p>
        </div>
      </div>

      <AdminProductTable products={products} />
    </section>
  );
}
