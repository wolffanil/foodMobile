import { useTypedRoute } from "@/hooks/useTypedRoute";
import { ProductService } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useProduct = () => {
  const { params } = useTypedRoute<"Product">();

  const { data: product, isPending } = useQuery({
    queryKey: ["get product by slug", params.slug],
    queryFn: () => ProductService.getBySlug(params.slug),
  });

  return { product, isPending };
};
