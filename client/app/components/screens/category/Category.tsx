import { View, Text } from "react-native";
import { useCategory } from "./useCategory";
import Loader from "@/components/ui/Loader";
import Layout from "@/components/ui/layout/Layout";
import Catalog from "@/components/ui/catalog/Catalog";

const Category = () => {
  const { category, products, isLoading } = useCategory();

  if (isLoading) return <Loader />;

  return (
    <Layout>
      {category ? (
        <Catalog title={category.name} products={products} />
      ) : (
        <Text>Category not found</Text>
      )}
    </Layout>
  );
};

export default Category;
