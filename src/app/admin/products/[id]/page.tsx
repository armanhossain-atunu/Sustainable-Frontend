import { notFound } from "next/navigation";

import ProductAdminForm from "@/Components/Products/ProductAdminForm";
import { requireAdmin } from "@/lib/auth";
import { getServerApiBaseUrl } from "@/lib/api";

async function getProduct(id: string) {
  const response = await fetch(`${getServerApiBaseUrl()}/products/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  return result?.data ?? null;
}

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const product = await getProduct(id);

  if (!product?._id) {
    notFound();
  }

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <ProductAdminForm
        mode="edit"
        productId={product._id}
        initialValues={{
          title: product.title ?? "",
          slug: product.slug ?? "",
          description: product.description ?? "",
          date: product.date ? String(product.date).slice(0, 10) : "",
          startTime: product.startTime ?? "",
          endTime: product.endTime ?? "",
          location: product.location ?? "",
          venue: product.venue ?? "",
          organizer: product.organizer ?? "",
          organizerContact: product.organizerContact ?? "",
          image: product.image ?? "",
          gallery: Array.isArray(product.gallery) ? product.gallery : [],
          category: product.category ?? "",
          price: Number(product.price ?? 0),
          discountPrice: Number(product.discountPrice ?? 0),
          status: product.status ?? "upcoming",
          isFeatured: Boolean(product.isFeatured),
        }}
      />
    </section>
  );
}
