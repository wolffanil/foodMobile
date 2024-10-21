import { ComponentType } from "react";

export type TypeRootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Profile: undefined;
  Explorer: undefined;
  Search: undefined;
  Favorites: undefined;
  Cart: undefined;
  Category: {
    slug: string;
  };
  Product: {
    slug: string;
  };
  Thanks: undefined;
};

export interface IRoute {
  name: keyof TypeRootStackParamList;
  component: ComponentType;
}
