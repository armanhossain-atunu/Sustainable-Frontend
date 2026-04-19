import {
  AllProductsSkeleton,
  RecentProductsSkeleton,
} from "@/Components/Products/ProductLoadingSkeletons";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <RecentProductsSkeleton />
      <AllProductsSkeleton />
    </div>
  );
}
