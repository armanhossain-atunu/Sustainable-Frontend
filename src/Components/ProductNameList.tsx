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
    <section className="mx-auto my-10 max-w-5xl rounded-xl border border-base-300 bg-base-200 p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">All Products</h2>
      <p className="mt-2 text-base-content/70">Showing names for all available products from the API.</p>
      <div className="mt-6 space-y-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col rounded-lg border border-base-300 bg-base-100 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-base-content">{product.title}</p>
              <p className="text-sm text-base-content/60">{product.description}</p>

              {product.price ? (
                <p className="text-sm text-base-content/60">Price: {product.price}</p>
              ) : null}

              {product.slug ? (
                <p className="text-sm text-base-content/60">Slug: {product.slug}</p>
              ) : null}
            </div>
            <div>
              <p className="text-sm text-base-content/60">Category: {product.category}</p>
              <p className="text-sm text-base-content/60">Rating: {product.rating}</p>
              <p className="text-sm text-base-content/60">Number of Reviews: {product.numReviews}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductNameList;
