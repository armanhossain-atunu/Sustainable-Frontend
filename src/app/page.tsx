import HeroSlider from '@/Components/Hero/HeroSlider';
import AllProducts from '@/Components/Products/AllProducts';
import RecentProducts from '@/Components/Products/RecentProducts';

// All products are fetched here and passed down to the ProductNameList component for display. This keeps the data fetching logic centralized in the page component, while the ProductNameList remains a pure presentational component.
async function fetchProducts() {
  const response = await fetch(`${process.env.SERVER_DOMAIN?.trim()}/products`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return [];
  }

  const json = await response.json();
  return Array.isArray(json.data) ? json.data : [];
}

const Home = async () => {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen">
      <HeroSlider />
      <RecentProducts products={products} />
      <AllProducts products={products} />
    </div>
  );
};

export default Home;
