import { CategoryService } from "@/services/categories.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  const { data: categories, isPending } = useQuery({
    queryKey: ["get categories"],
    queryFn: () => CategoryService.getAll(),
  });

  return { categories, isPending };
};
