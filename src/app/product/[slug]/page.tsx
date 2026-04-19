import { Suspense } from "react";

import ProductAddToCartButton from "@/Components/Products/ProductAddToCartButton";
import { ProductDetailSkeleton } from "@/Components/Products/ProductLoadingSkeletons";
import ProductServiceRequestForm from "@/Components/Products/ProductServiceRequestForm";
import Image from "next/image";
import { notFound } from "next/navigation";

// import ProductAddToCartButton from "@/components/Products/ProductAddToCartButton";
// import ProductServiceRequestForm from "@/components/Products/ProductServiceRequestForm";

type Product = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  price?: number | string;
  discountPrice?: number | string;
  category?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  venue?: string;
  organizer?: string;
  organizerContact?: string;
  status?: string;
  modelNumber?: string;
  tags?: string[];
};

function getBaseUrl() {
  return process.env.SERVER_DOMAIN?.trim().replace(/\/+$/, "") ?? "";
}

function toNumber(value: Product["price"]) {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim()) return Number(value);
  return 0;
}

function formatPrice(value: Product["price"]) {
  const amount = toNumber(value);
  return `$${amount.toFixed(2)}`;
}

function formatDate(value?: string) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(date);
}

async function getProduct(slug: string): Promise<Product | null> {
  const baseUrl = getBaseUrl();
  if (!baseUrl) {
    return null;
  }

  const res = await fetch(`${baseUrl}/products/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const json = await res.json();
  return (json?.data ?? json) as Product | null;
}

async function ProductDetailsContent({ slug }: { slug: string }) {
  const product = await getProduct(slug);

  if (!product?._id) {
    notFound();
  }

  const regularPrice = toNumber(product.price);
  const discountedPrice = toNumber(product.discountPrice);
  const hasDiscount = discountedPrice > 0 && discountedPrice < regularPrice;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="group relative overflow-hidden rounded-3xl border border-base-300 bg-base-200 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl">
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-black/10 via-transparent to-white/20 opacity-70 transition duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute -right-16 top-0 z-10 h-40 w-40 rounded-full bg-white/20 blur-3xl transition duration-500 group-hover:scale-125" />
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              width={900}
              height={900}
              priority
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex min-h-[420px] items-center justify-center text-base-content/50">
              Product image unavailable
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {product.category ? (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {product.category}
                </span>
              ) : null}
              {product.status ? (
                <span className="rounded-full bg-base-200 px-3 py-1 text-sm font-medium capitalize text-base-content/80">
                  {product.status}
                </span>
              ) : null}
            </div>

            <h1 className="text-3xl font-bold leading-tight text-base-content sm:text-4xl">
              {product.title}
            </h1>

            <p className="text-base leading-7 text-base-content/75">
              {product.description || "No description is available for this product yet."}
            </p>
          </div>

          <div className="rounded-3xl border border-base-300 bg-base-200 p-5 shadow-sm">
            <div className="flex flex-wrap items-end gap-3">
              <p className="text-3xl font-bold text-primary">
                {formatPrice(hasDiscount ? product.discountPrice : product.price)}
              </p>
              {hasDiscount ? (
                <p className="text-base font-medium text-base-content/50 line-through">
                  {formatPrice(product.price)}
                </p>
              ) : null}
            </div>

            <p className="mt-2 text-sm text-base-content/60">
              {hasDiscount ? "Discounted price available now." : "Current listed price."}
            </p>

            <div className="mt-5">
              <ProductAddToCartButton
                product={{
                  _id: product._id,
                  title: product.title,
                  price: hasDiscount ? discountedPrice : regularPrice,
                  image: product.image ?? "/favicon.ico",
                }}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {product.date ? (
              <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
                <p className="text-sm font-medium text-base-content/50">Date</p>
                <p className="mt-1 font-semibold">{formatDate(product.date)}</p>
              </div>
            ) : null}
            {product.location ? (
              <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
                <p className="text-sm font-medium text-base-content/50">Location</p>
                <p className="mt-1 font-semibold">{product.location}</p>
              </div>
            ) : null}
            {product.venue ? (
              <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
                <p className="text-sm font-medium text-base-content/50">Venue</p>
                <p className="mt-1 font-semibold">{product.venue}</p>
              </div>
            ) : null}
            {product.organizer ? (
              <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
                <p className="text-sm font-medium text-base-content/50">Organizer</p>
                <p className="mt-1 font-semibold">{product.organizer}</p>
              </div>
            ) : null}
          </div>

          {product.tags?.length ? (
            <div>
              <p className="mb-3 text-sm font-medium text-base-content/50">Tags</p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-base-300 px-3 py-1 text-sm text-base-content/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <ProductServiceRequestForm
            productName={product.title}
            modelNumber={product.modelNumber}
          />
        </div>
      </div>
    </section>
  );
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailsContent slug={slug} />
    </Suspense>
  );
}
