import Layout from "@/components/ui/layout/Layout";
import Header from "./Header";
import Banner from "./banner/Banner";
import Categories from "./categories/Categories";
import Products from "./products/Products";

const HomeScreen = () => {
  return (
    <Layout>
      <Header />
      <Banner />
      <Categories />
      <Products />
    </Layout>
  );
};

export default HomeScreen;
