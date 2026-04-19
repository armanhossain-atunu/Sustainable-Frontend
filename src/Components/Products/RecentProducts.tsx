import Image from "next/image";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  image?: string;
  price?: number;
  category?: string;
  date?: string;
  isFeatured?: boolean;
};

function getSortedRecentProducts(products: Product[]) {
  return [...products]
    .sort((a, b) => {
      const first = a.date ? new Date(a.date).getTime() : 0;
      const second = b.date ? new Date(b.date).getTime() : 0;
      return second - first;
    })
    .slice(0, 4);
}

function formatDate(value?: string) {
  if (!value) return "New arrival";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "New arrival";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(date);
}

export default function RecentProducts({
  products,
}: {
  products: Product[];
}) {
  const recentProducts = getSortedRecentProducts(products);

  if (!recentProducts.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            Recent Products
          </p>
          <h2 className="mt-2 text-3xl font-bold text-base-content">
            Newly added picks for your next sustainable upgrade
          </h2>
        </div>
        <Link href="/" className="text-sm font-semibold text-primary hover:underline">
          Explore all products
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {recentProducts.map((product) => (
          <article
            key={product._id}
            className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="relative h-64 overflow-hidden bg-base-200">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-base-content/50">
                  No image
                </div>
              )}

              <div className="absolute left-4 top-4 flex gap-2">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-800">
                  New
                </span>
                {product.isFeatured ? (
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-content">
                    Featured
                  </span>
                ) : null}
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div className="space-y-2">
                <p className="text-sm text-base-content/60">
                  {product.category || "Sustainable tech"} | {formatDate(product.date)}
                </p>
                <h3 className="text-xl font-semibold text-base-content">
                  {product.title}
                </h3>
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="text-2xl font-bold text-primary">
                  ${Number(product.price ?? 0).toFixed(2)}
                </p>
                <Link href={`/product/${product._id}`} className="btn btn-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
