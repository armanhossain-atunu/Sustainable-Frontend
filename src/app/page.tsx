import HeroSlider from "@/Components/Hero/HeroSlider";
import AllProducts from "@/Components/Products/AllProducts";
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

const Home = async ({ searchParams }: HomePageProps) => {
  const { search = "" } = await searchParams;
  const products = await fetchProducts(search);
  const isSearching = Boolean(search.trim());

  return (
    <div className="min-h-screen">
      <HeroSlider />
      {!isSearching ? <RecentProducts products={products} /> : null}
      <AllProducts products={products} searchQuery={search} />
      <ProductServiceRequestForm />
    </div>
  );
};

export default Home;
