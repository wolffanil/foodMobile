import { TypeRootStackParamList } from "@/navigation/navigation.type";
import { TypeFeatherIconNames } from "@/types/icon.interface";

export interface IMenuItem {
  icon: TypeFeatherIconNames;
  path: keyof TypeRootStackParamList;
}

export type TypeNavigate = (screenName: keyof TypeRootStackParamList) => void;
