import { ICategory } from "@/types/category";
import { request } from "./api/request";
import { getCategoryUrl } from "@/config/api.config";

export const CategoryService = {
  async getAll() {
    return request<ICategory[]>({
      url: getCategoryUrl(""),
      method: "GET",
    });
  },

  async getBySlug(slug: string) {
    return request<ICategory>({
      url: getCategoryUrl(`/by-slug/${slug}`),
      method: "GET",
    });
  },
};
