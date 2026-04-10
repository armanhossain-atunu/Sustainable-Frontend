"use client";
import Image from "next/image";
import React from "react";

type Product = {
  _id: string;
  title: string;
  slug?: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  numReviews: number;
};

type ProductNameListProps = {
  products: Product[];
};

const ProductNameList = ({ products }: ProductNameListProps) => {
  if (!products.length) {
    return (
      <section className="mx-auto my-10 max-w-5xl rounded-xl border border-base-300 bg-base-200 p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">All Products</h2>
        <p className="mt-4 text-base-content/70">No products were found at the moment.</p>
      </section>
    );
  }

  return (
   <div className="mx-auto my-10 max-w-6xl rounded-xl border border-base-300 bg-base-200 p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="card bg-base-100 shadow-sm">
            <figure>
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={300}
                className="object-cover h-50"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{product.title}</h3>
              <p className="text-sm text-base-content/70">{product.category}</p>
              <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 

export default ProductNameList;
