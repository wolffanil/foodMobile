import Button from "@/components/ui/button/Button";
import Heading from "@/components/ui/Heading";
import Layout from "@/components/ui/layout/Layout";
import { useCart } from "@/hooks/useCart";
import { convertPrice } from "@/utils/convertPrice";
import { View, Text } from "react-native";
import CartItem from "./cart-item/CartItem";
import { useCheckout } from "./useCheckout";

const Cart = () => {
  const { items, total } = useCart();
  const { onCheckout } = useCheckout();

  return (
    <>
      <Layout>
        <Heading>Cart</Heading>

        {items.length ? (
          items.map((item) => <CartItem item={item} key={item.id} />)
        ) : (
          <Text className="mt-2">Cart is empty</Text>
        )}
      </Layout>

      {items.length ? (
        <View className="bottom-8 absolute w-[90%] mx-5">
          <Text className="font-bold text-xl">
            Total: {convertPrice(total)}
          </Text>
          <Button onPress={() => onCheckout()}>Place order</Button>
        </View>
      ) : null}
    </>
  );
};

export default Cart;
