import { ProductService } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = () => {
  const { data: products, isPending } = useQuery({
    queryKey: ["get all products"],
    queryFn: () => ProductService.getAll(),
  });

  return { products, isPending };
};
