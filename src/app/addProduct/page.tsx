import ProductAdminForm from "@/Components/Products/ProductAdminForm";
import { requireAdmin } from "@/lib/auth";

const AddProduct = async () => {
  await requireAdmin();

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <ProductAdminForm mode="create" />
    </section>
  );
};

export default AddProduct;
