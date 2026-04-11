"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

export default function CartPage() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mx-auto my-10 max-w-5xl rounded-xl border border-base-300 bg-base-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Cart</h2>
        {cart.length > 0 && (
          <button
            onClick={() => {
              clearCart();
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
          <Link href="/products" className="btn btn-primary btn-sm">
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
                {/* Product Image */}
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{product.title}</h3>
                  <p className="text-sm text-base-content/60">
                    ${product.price.toFixed(2)} each
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-circle btn-sm btn-outline"
                    onClick={() => {
                      decreaseQuantity(product._id);
                      if (product.quantity === 1) {
                        toast.error(`"${product.title}" removed from cart.`);
                      } else {
                        toast.info(`Quantity decreased.`);
                      }
                    }}
                    aria-label="Decrease quantity"
                  >
                    −
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
                      toast.success(`Quantity increased!`);
                    }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Line Total + Remove */}
                <div className="flex items-center gap-3">
                  <p className="w-20 text-right font-bold">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                  <button
                    className="btn btn-ghost btn-sm text-error px-2"
                    onClick={() => {
                      removeFromCart(product._id);
                      toast.error(`"${product.title}" removed from cart.`);
                    }}
                    aria-label="Remove item"
                    title="Remove item"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-6 rounded-xl bg-base-100 p-4 shadow-sm">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Link href="/checkout" className="btn btn-primary">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
