function SkeletonBlock({
  className,
}: {
  className: string;
}) {
  return <div className={`animate-pulse rounded-2xl bg-base-200 ${className}`} />;
}

export function RecentProductsSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <SkeletonBlock className="h-4 w-32 rounded-full" />
          <SkeletonBlock className="h-10 w-[32rem] max-w-full" />
        </div>
        <SkeletonBlock className="h-5 w-32 rounded-full" />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`recent-skeleton-${index}`}
            className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm"
          >
            <SkeletonBlock className="h-64 w-full rounded-none" />
            <div className="space-y-4 p-5">
              <div className="space-y-2">
                <SkeletonBlock className="h-4 w-40 rounded-full" />
                <SkeletonBlock className="h-7 w-11/12" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <SkeletonBlock className="h-8 w-24" />
                <SkeletonBlock className="h-9 w-28 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AllProductsSkeleton() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-6 space-y-3">
        <SkeletonBlock className="h-9 w-56" />
        <SkeletonBlock className="h-4 w-72 max-w-full rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={`all-products-skeleton-${index}`}
            className="rounded-lg border border-base-300 bg-base-100 p-4 shadow"
          >
            <SkeletonBlock className="h-40 w-full rounded-xl" />
            <SkeletonBlock className="mt-4 h-7 w-4/5" />
            <SkeletonBlock className="mt-3 h-8 w-24" />
            <SkeletonBlock className="mt-5 h-10 w-32 rounded-xl" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProductDetailSkeleton() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <SkeletonBlock className="min-h-[420px] w-full rounded-3xl" />

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <SkeletonBlock className="h-8 w-24 rounded-full" />
              <SkeletonBlock className="h-8 w-20 rounded-full" />
            </div>
            <SkeletonBlock className="h-12 w-4/5" />
            <SkeletonBlock className="h-5 w-full" />
            <SkeletonBlock className="h-5 w-11/12" />
            <SkeletonBlock className="h-5 w-3/4" />
          </div>

          <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm">
            <SkeletonBlock className="h-10 w-36" />
            <SkeletonBlock className="mt-3 h-4 w-40 rounded-full" />
            <SkeletonBlock className="mt-5 h-12 w-full rounded-xl" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonBlock key={`detail-meta-${index}`} className="h-24 w-full" />
            ))}
          </div>

          <div className="space-y-3">
            <SkeletonBlock className="h-4 w-16 rounded-full" />
            <div className="flex flex-wrap gap-2">
              <SkeletonBlock className="h-8 w-20 rounded-full" />
              <SkeletonBlock className="h-8 w-24 rounded-full" />
              <SkeletonBlock className="h-8 w-16 rounded-full" />
            </div>
          </div>

          <div className="rounded-2xl border border-base-300 bg-base-300 p-6 shadow-lg sm:p-10">
            <div className="space-y-6">
              <div className="space-y-3">
                <SkeletonBlock className="h-8 w-64" />
                <SkeletonBlock className="h-4 w-72 rounded-full" />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonBlock key={`detail-field-${index}`} className="h-12 w-full rounded-xl" />
                ))}
                <SkeletonBlock className="h-32 w-full md:col-span-2" />
                <div className="md:col-span-2 flex justify-end">
                  <SkeletonBlock className="h-12 w-40 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
