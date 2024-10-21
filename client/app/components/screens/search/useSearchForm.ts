import { useForm } from "react-hook-form";
import { ISearchFormData } from "./search.interface";
import { useDebounce } from "@/hooks/useDebounce";
import { useMemo } from "react";

export const useSearchForm = () => {
  const { control, watch } = useForm<ISearchFormData>({
    mode: "onChange",
  });

  const searchTerm = watch("searchTerm");
  const debouncedValue = useDebounce(searchTerm, 400);

  return useMemo(
    () => ({
      debouncedValue,
      searchTerm,
      control,
    }),
    [searchTerm]
  );
};
