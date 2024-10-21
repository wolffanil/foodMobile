import { useQuery } from "@tanstack/react-query";
import { useSearchForm } from "./useSearchForm";
import { ProductService } from "@/services/product.service";

export const useSearch = () => {
  const { searchTerm, debouncedValue, control } = useSearchForm();

  const { data: products, isPending } = useQuery({
    queryKey: ["search products", debouncedValue],
    queryFn: () => ProductService.getAll(debouncedValue),
    enabled: !!debouncedValue,
  });

  return { products, isPending, control, searchTerm };
};
