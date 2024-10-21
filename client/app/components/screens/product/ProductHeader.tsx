import { FC } from "react";
import { View, Text } from "react-native";
import { IProductComponent } from "./product.page.interface";
import { useTypedNavigation } from "@/hooks/useTypedNavigation";
import ProductButton from "./ProductButton";
import FavoriteButton from "./favoriteButton/FavoriteButton";

const ProductHeader: FC<IProductComponent> = ({ product }) => {
  const { goBack } = useTypedNavigation();

  return (
    <View>
      <View className="flex flex-row justify-between mt-2">
        <ProductButton
          onPress={goBack}
          icon="chevron-left"
          iconSize={26}
          color="#555"
        />
        <FavoriteButton productId={product._id} />
      </View>
    </View>
  );
};

export default ProductHeader;
