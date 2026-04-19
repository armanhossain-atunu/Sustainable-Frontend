"use client";

import { toast } from "react-toastify";

import { useCart } from "@/context/CartContext";

type ProductAddToCartButtonProps = {
  product: {
    _id: string;
    title: string;
    price: number;
    image: string;
  };
};

export default function ProductAddToCartButton({
  product,
}: ProductAddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => {
        addToCart(product);
        toast.success(`"${product.title}" added to cart.`);
      }}
      className="btn btn-primary w-full"
    >
      Add to Cart
    </button>
  );
}
