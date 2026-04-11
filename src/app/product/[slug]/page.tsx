"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Product = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  numReviews: number;
};

function StarRating({ rating, numReviews }: { rating: number, numReviews: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`h-5 w-5 ${
            star <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-base-300 text-base-300"
          }`}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-base-content/60">
        {rating?.toFixed(1)} ({numReviews} reviews)
      </span>
    </div>
  );
}

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(false);

    // Using query parameter because direct slug route is not available
    fetch(`https://sustainable-server.vercel.app/api/v1/products?slug=${slug}`, {
      cache: "no-store",
    } as RequestInit)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((json) => {
        const data = json?.data;
        if (Array.isArray(data) && data.length > 0) {
          setProduct(data[0]);
        } else if (data && !Array.isArray(data)) {
          setProduct(data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    toast.success(`"${product.title}" added to cart! 🛒`, {
      position: "bottom-right",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  /* ---------- ERROR / NOT FOUND ---------- */
  if (error || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-error">Product not found.</p>
        <Link href="/" className="btn btn-primary btn-sm">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto my-10 max-w-5xl px-4">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm breadcrumbs text-base-content/60">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>{product.category}</li>
          <li className="text-base-content font-medium truncate max-w-[200px]">
            {product.title}
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 rounded-2xl bg-base-200 border border-base-300 p-6 shadow-sm">
        {/* LEFT — Image */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-base-100 shadow-inner">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            priority
          />
        </div>

        {/* RIGHT — Info */}
        <div className="flex flex-col gap-4 justify-center">
          {/* Category badge */}
          <span className="badge badge-outline badge-sm uppercase tracking-widest">
            {product.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

          {/* Rating */}
          <StarRating rating={product.rating} numReviews={product.numReviews} />

          {/* Price */}
          <p className="text-4xl font-extrabold text-primary">
            ${product.price.toFixed(2)}
          </p>

          {/* Description */}
          <p className="text-base-content/70 leading-relaxed text-sm">
            {product.description}
          </p>

          <div className="divider my-0" />

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAddToCart}
              className={`btn btn-primary flex-1 transition-all ${
                added ? "btn-success" : ""
              }`}
            >
              {added ? "✓ Added!" : "🛒 Add to Cart"}
            </button>
            <Link href="/cart" className="btn btn-outline flex-1">
              View Cart
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 text-xs text-base-content/50 mt-2">
            <span>✅ Free Shipping</span>
            <span>🔄 30-Day Returns</span>
            <span>🛡️ 1 Year Warranty</span>
          </div>
        </div>
      </div>
    </div>
  );
}

