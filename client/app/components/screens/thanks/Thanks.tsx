import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Thanks = () => {
  return (
    <View className="justify-center items-center mt-40">
      <FontAwesome name="check-circle" size={100} color="#61ab2c" />
      <Text className="font-bold text-5xl mt-8">Thank you!</Text>
    </View>
  );
};

export default Thanks;
