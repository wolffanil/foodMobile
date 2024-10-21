import { useTypedRoute } from "@/hooks/useTypedRoute";
import { CategoryService } from "@/services/categories.service";
import { ProductService } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useCategory = () => {
  const { params } = useTypedRoute<"Category">();

  const { data: category, isPending: isCategoryLoading } = useQuery({
    queryKey: ["get category by slug", params.slug],
    queryFn: () => CategoryService.getBySlug(params.slug),
  });

  const categoryId = category?._id || "";

  const { data: products, isPending: isProductLoading } = useQuery({
    queryKey: ["get product by slug", params.slug],
    queryFn: () => ProductService.getByCategories(params.slug),
    enabled: !!categoryId,
  });

  return {
    category,
    products,
    isLoading: isCategoryLoading || isProductLoading,
  };
};
