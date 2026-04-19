import { Suspense } from "react";

import HeroSlider from "@/Components/Hero/HeroSlider";
import AllProducts from "@/Components/Products/AllProducts";
import {
  AllProductsSkeleton,
  RecentProductsSkeleton,
} from "@/Components/Products/ProductLoadingSkeletons";
import ProductServiceRequestForm from "@/Components/Products/ProductServiceRequestForm";
import RecentProducts from "@/Components/Products/RecentProducts";

async function fetchProducts(search?: string) {
  const baseUrl = process.env.SERVER_DOMAIN?.trim();
  const searchText = search?.trim();
  const query = searchText ? `?search=${encodeURIComponent(searchText)}` : "";

  const response = await fetch(`${baseUrl}/products${query}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const json = await response.json();
  return Array.isArray(json.data) ? json.data : [];
}

type HomePageProps = {
  searchParams: Promise<{ search?: string }>;
};

async function HomeProductsSection({ search }: { search: string }) {
  const products = await fetchProducts(search);
  const isSearching = Boolean(search.trim());

  return (
    <>
      {!isSearching ? <RecentProducts products={products} /> : null}
      <AllProducts products={products} searchQuery={search} />
    </>
  );
}

function HomeProductsFallback() {
  return (
    <>
      <RecentProductsSkeleton />
      <AllProductsSkeleton />
    </>
  );
}

const Home = async ({ searchParams }: HomePageProps) => {
  const { search = "" } = await searchParams;

  return (
    <div className="min-h-screen">
      <HeroSlider />
      <Suspense fallback={<HomeProductsFallback />}>
        <HomeProductsSection search={search} />
      </Suspense>
      <ProductServiceRequestForm />
    </div>
  );
};

export default Home;
