import { TypeRootStackParamList } from "@/navigation/navigation.type";
import { RouteProp, useRoute } from "@react-navigation/core";

export const useTypedRoute = <N extends keyof TypeRootStackParamList>() =>
  useRoute<RouteProp<TypeRootStackParamList, N>>();
