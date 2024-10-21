import { View, Text, Image } from "react-native";
import { useProduct } from "./useProduct";
import Loader from "@/components/ui/Loader";
import Layout from "@/components/ui/layout/Layout";
import { getMediaSource } from "@/utils/getMediaSource";
import ProductHeader from "./ProductHeader";
import ProductInfo from "./product-info/ProductInfo";
import AddToCartButton from "./product-info/AddToCartButton";

const Product = () => {
  const { isPending, product } = useProduct();

  if (isPending) return <Loader />;
  if (!product) return null;

  return (
    <Layout>
      <ProductHeader product={product} />
      <View className="items-center justify-center mt-4">
        <Image
          source={getMediaSource(product.image)}
          width={260}
          height={260}
        />
      </View>
      <ProductInfo product={product} />
      <AddToCartButton product={product} />
    </Layout>
  );
};

export default Product;
