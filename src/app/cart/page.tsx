import Link from "next/link";
import React from "react";

export default function CartPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-10">
      <div className="card w-full max-w-2xl bg-base-200 shadow-lg">
        <div className="card-body items-center text-center">
          <h1 className="card-title">Your Shopping Cart</h1>
          <p className="text-base-content/80">
            Your cart is empty for now. Browse our laptops, mobiles, and accessories to add items.
          </p>
          <div className="card-actions justify-center">
            <Link href="/" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
