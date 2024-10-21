import { FC } from "react";
import { View, Text } from "react-native";
import { ICatalog } from "./catalog.interface";
import Heading from "../Heading";
import ProductItem from "./product-item/ProductItem";

const Catalog: FC<ICatalog> = ({ title, products }) => {
  return (
    <View className="mb-16">
      {title && <Heading>{title}</Heading>}
      {products?.length ? (
        <View className="flex-row flex-wrap flex justify-between mt-4">
          {products.map((product) => (
            <ProductItem product={product} key={product._id} />
          ))}
        </View>
      ) : (
        <Text className="mt-2">Products not found</Text>
      )}
    </View>
  );
};

export default Catalog;
