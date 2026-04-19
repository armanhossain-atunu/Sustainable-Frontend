"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

import { useCart } from "@/context/CartContext";

type PromoRule =
  | {
      code: string;
      type: "percent";
      value: number;
      label: string;
    }
  | {
      code: string;
      type: "fixed";
      value: number;
      label: string;
    };

const PROMO_RULES: PromoRule[] = [
  { code: "GREEN10", type: "percent", value: 10, label: "10% off your order" },
  { code: "SAVE20", type: "fixed", value: 20, label: "$20 off orders" },
  { code: "WELCOME5", type: "fixed", value: 5, label: "$5 welcome discount" },
];

function findPromoRule(code: string) {
  return PROMO_RULES.find((promo) => promo.code === code.trim().toUpperCase());
}

export default function CartPage() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<PromoRule | null>(null);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const discount = useMemo(() => {
    if (!appliedPromo) return 0;

    if (appliedPromo.type === "percent") {
      return subtotal * (appliedPromo.value / 100);
    }

    return Math.min(appliedPromo.value, subtotal);
  }, [appliedPromo, subtotal]);

  const total = Math.max(subtotal - discount, 0);

  const applyPromoCode = () => {
    if (!promoInput.trim()) {
      toast.info("Enter a promo code first.");
      return;
    }

    const matchedPromo = findPromoRule(promoInput);
    if (!matchedPromo) {
      toast.error("Promo code is invalid.");
      return;
    }

    setAppliedPromo(matchedPromo);
    setPromoInput(matchedPromo.code);
    toast.success(`Promo code applied: ${matchedPromo.label}.`);
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoInput("");
    toast.info("Promo code removed.");
  };

  return (
    <div className="mx-auto my-10 max-w-5xl rounded-xl border border-base-300 bg-base-200 p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Cart</h2>
        {cart.length > 0 && (
          <button
            onClick={() => {
              clearCart();
              setAppliedPromo(null);
              setPromoInput("");
              toast.info("Cart cleared.");
            }}
            className="btn btn-ghost btn-sm text-error"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-base-content/60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 opacity-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-lg font-medium">Your cart is empty</p>
          <Link href="/" className="btn btn-primary btn-sm">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-4 rounded-xl bg-base-100 p-4 shadow-sm"
              >
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold">{product.title}</h3>
                  <p className="text-sm text-base-content/60">
                    ${product.price.toFixed(2)} each
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-circle btn-sm btn-outline"
                    onClick={() => {
                      decreaseQuantity(product._id);
                      if (product.quantity === 1) {
                        toast.error(`"${product.title}" removed from cart.`);
                      } else {
                        toast.info("Quantity decreased.");
                      }
                    }}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold">
                    {product.quantity}
                  </span>
                  <button
                    className="btn btn-circle btn-sm btn-outline"
                    onClick={() => {
                      addToCart({
                        _id: product._id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                      });
                      toast.success("Quantity increased!");
                    }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <p className="w-20 text-right font-bold">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                  <button
                    className="btn btn-ghost btn-sm px-2 text-error"
                    onClick={() => {
                      removeFromCart(product._id);
                      toast.error(`"${product.title}" removed from cart.`);
                    }}
                    aria-label="Remove item"
                    title="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-base-100 p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Promo Code</h3>
              <span className="text-sm text-base-content/60">
                Try `GREEN10`, `SAVE20`, or `WELCOME5`
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={promoInput}
                onChange={(event) => setPromoInput(event.target.value.toUpperCase())}
                placeholder="Enter promo code"
                className="input input-bordered w-full"
              />
              <button type="button" onClick={applyPromoCode} className="btn btn-primary">
                Apply
              </button>
              {appliedPromo ? (
                <button
                  type="button"
                  onClick={removePromoCode}
                  className="btn btn-ghost"
                >
                  Remove
                </button>
              ) : null}
            </div>

            {appliedPromo ? (
              <p className="mt-3 text-sm font-medium text-success">
                {appliedPromo.code} applied: {appliedPromo.label}
              </p>
            ) : null}
          </div>

          <div className="mt-6 rounded-xl bg-base-100 p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-base-content/70">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base-content/70">
                <span>Discount</span>
                <span className="text-success">-${discount.toFixed(2)}</span>
              </div>
              <div className="border-t border-base-300 pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Link href="/checkout" className="btn btn-primary">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
