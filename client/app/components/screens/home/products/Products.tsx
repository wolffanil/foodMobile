import { useProducts } from "./useProducts";
import Loader from "@/components/ui/Loader";
import Catalog from "@/components/ui/catalog/Catalog";

const Products = () => {
  const { isPending, products } = useProducts();

  return isPending ? (
    <Loader />
  ) : (
    <Catalog title="Products" products={products || []} />
  );
};

export default Products;
