import Link from "next/link";

import { requireUser } from "@/lib/auth";

export default async function UserDashboardPage() {
  const user = await requireUser();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-base-300 bg-base-100 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
          User Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold text-base-content">
          Welcome back, {user.name || "User"}
        </h1>
        <p className="mt-3 max-w-2xl text-base-content/70">
          Manage your account, review your cart, and continue exploring products from one place.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link href="/cart" className="rounded-2xl border border-base-300 bg-base-200 p-5">
            <h2 className="text-lg font-semibold">My Cart</h2>
            <p className="mt-2 text-sm text-base-content/60">
              Review items you have added and continue to checkout.
            </p>
          </Link>
          <div className="rounded-2xl border border-base-300 bg-base-200 p-5">
            <h2 className="text-lg font-semibold">Account Info</h2>
            <p className="mt-2 text-sm text-base-content/60">{user.email}</p>
            <p className="mt-1 text-sm text-base-content/60 capitalize">
              Role: {user.role}
            </p>
          </div>
          <Link href="/" className="rounded-2xl border border-base-300 bg-base-200 p-5">
            <h2 className="text-lg font-semibold">Browse Products</h2>
            <p className="mt-2 text-sm text-base-content/60">
              Discover the latest sustainable products and event listings.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
