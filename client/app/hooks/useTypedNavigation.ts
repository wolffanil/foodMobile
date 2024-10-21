import { TypeRootStackParamList } from "@/navigation/navigation.type";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export const useTypedNavigation = () =>
  useNavigation<NavigationProp<TypeRootStackParamList>>();
