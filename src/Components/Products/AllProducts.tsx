"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AllProducts = ({ products }) => {
    console.log(products);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2>All Products {products.length}</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {products?.slice(0, 16).map((product) => (
                    <div key={product._id} className="border p-4 rounded-lg shadow">
                        <Image src={product.image} alt={product.title} width={300} height={200} className="w-full h-40 object-cover rounded" />
                        <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                        <h2 className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</h2>
                        <div className='mt-5'>
                            {/* <span className={`px-2 py-1 text-sm rounded ${product.status === 'upcoming' ? 'bg-yellow-200 text-yellow-800' : product.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                            </span> */}
                          <Link href={`/product/${product._id}`} className="bg-blue-600 mt-4 hover:bg-blue-700 text-white py-2 px-4 rounded">
                            View Details
                          </Link>
                          
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
