import { useProfile } from "../profile/useProfile";
import Layout from "@/components/ui/layout/Layout";
import Catalog from "@/components/ui/catalog/Catalog";

const Favorites = () => {
  const { profile } = useProfile();

  return (
    <Layout>
      <Catalog title="Favorites" products={profile?.favorites || []} />
    </Layout>
  );
};

export default Favorites;
