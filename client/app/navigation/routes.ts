import Home from "@/components/screens/home/Home";
import { IRoute } from "./navigation.type";
import Favorites from "@/components/screens/favorites/Favorites";
import Profile from "@/components/screens/profile/Profile";
import Search from "@/components/screens/search/Search";
import Explorer from "@/components/screens/explorer/Explorer";
import Cart from "@/components/screens/cart/Cart";
import Category from "@/components/screens/category/Category";
import Product from "@/components/screens/product/Product";
import Thanks from "@/components/screens/thanks/Thanks";

export const routes: IRoute[] = [
  {
    name: "Home",
    component: Home,
  },
  {
    name: "Favorites",
    component: Favorites,
  },
  {
    name: "Profile",
    component: Profile,
  },
  {
    name: "Search",
    component: Search,
  },
  {
    name: "Explorer",
    component: Explorer,
  },
  {
    name: "Cart",
    component: Cart,
  },
  {
    name: "Category",
    component: Category,
  },
  {
    name: "Product",
    component: Product,
  },
  {
    name: "Thanks",
    component: Thanks,
  },
];
