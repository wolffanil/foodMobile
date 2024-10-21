import { useTypedNavigation } from "@/hooks/useTypedNavigation";
import { View, Text, Pressable } from "react-native";
import { useProfile } from "../profile/useProfile";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const { navigate } = useTypedNavigation();

  const { profile } = useProfile();

  return (
    <View className="flex-row justify-between items-center">
      <Text className="font-medium text-2xl">Hello, {profile?.name}!</Text>

      <Pressable onPress={() => navigate("Cart")}>
        <Ionicons name="cart" size={26} color="#374151" />
      </Pressable>
    </View>
  );
};

export default Header;
