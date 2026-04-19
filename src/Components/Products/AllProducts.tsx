"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Product = {
  _id: string;
  title: string;
  image: string;
  price: number;
};

const AllProducts = ({
  products,
  searchQuery = "",
}: {
  products: Product[];
  searchQuery?: string;
}) => {
  const trimmedQuery = searchQuery.trim();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">
          {trimmedQuery
            ? `Search results for "${trimmedQuery}"`
            : `All Products ${products.length}`}
        </h2>
        {trimmedQuery ? (
          <p className="text-sm text-base-content/60">
            Found {products.length} product{products.length === 1 ? "" : "s"} by title search.
          </p>
        ) : null}
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 p-10 text-center">
          <h3 className="text-xl font-semibold">No products found</h3>
          <p className="mt-2 text-base-content/60">
            Try a different product title in the search bar.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 16).map((product) => (
            <div key={product._id} className="rounded-lg border p-4 shadow">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={200}
                className="h-40 w-full hover:scale-105 transition duration-300 rounded object-cover"
              />
              <h3 className="mt-2 text-lg font-semibold">{product.title}</h3>
              <h2 className="text-xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </h2>
              <div className="mt-5">
                <Link
                  href={`/product/${product._id}`}
                  className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
