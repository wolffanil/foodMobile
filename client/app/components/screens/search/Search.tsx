import { View, Text } from "react-native";
import { useSearch } from "./useSearch";
import Layout from "@/components/ui/layout/Layout";
import Heading from "@/components/ui/Heading";
import Field from "@/components/ui/field/Field";
import { ISearchFormData } from "./search.interface";
import Loader from "@/components/ui/Loader";
import Catalog from "@/components/ui/catalog/Catalog";

const Search = () => {
  const { control, searchTerm, isPending, products } = useSearch();

  return (
    <Layout>
      <Heading>Search</Heading>

      <View className="mt-3">
        <Field<ISearchFormData>
          placeholder="Type something..."
          control={control}
          name="searchTerm"
          keyboardType="web-search"
        />

        {!!searchTerm ? (
          <View className="mt-2">
            {isPending ? <Loader /> : <Catalog products={products || []} />}
          </View>
        ) : null}
      </View>
    </Layout>
  );
};

export default Search;
