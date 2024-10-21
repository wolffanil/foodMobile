import { useGetAllProducts } from "./useGetAllProducts";
import Layout from "@/components/ui/layout/Layout";
import Loader from "@/components/ui/Loader";
import Catalog from "@/components/ui/catalog/Catalog";

const Explorer = () => {
  const { products, isPending } = useGetAllProducts();

  return (
    <Layout>
      {isPending ? (
        <Loader />
      ) : (
        <Catalog title="Explorer" products={products || []} />
      )}
    </Layout>
  );
};

export default Explorer;
