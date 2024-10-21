import { View, Text, Pressable, Image } from "react-native";
import { useGetAllCategories } from "./useGetAllCategories";
import Loader from "@/components/ui/Loader";
import Heading from "@/components/ui/Heading";
import { useTypedNavigation } from "@/hooks/useTypedNavigation";
import { getMediaSource } from "@/utils/getMediaSource";

const Categories = () => {
  const { categories, isPending } = useGetAllCategories();

  const { navigate } = useTypedNavigation();

  return isPending ? (
    <Loader />
  ) : (
    <View className="flex flex-col mt-5 mb-4">
      <Heading>Categories</Heading>

      <View className="flex flex-row justify-center mt-5">
        {categories?.map((category) => (
          <Pressable
            onPress={() =>
              navigate("Category", {
                slug: category.slug,
              })
            }
            key={category._id}
            className="rounded-xl bg-gray-100 p-5 mx-2"
          >
            <Image
              source={getMediaSource(category.image)}
              className="w-10 h-8 mb-2 p-3"
              style={{
                resizeMode: "cover",
              }}
            />
            <Text className="font-normal text-xs text-center">
              {category.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Categories;
