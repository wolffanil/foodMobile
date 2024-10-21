import { ProductService } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const { data: products, isPending } = useQuery({
    queryKey: ["get products"],
    queryFn: () => ProductService.getAll(),
    select: (data) => data.slice(0, 4),
  });

  return { products, isPending };
};
