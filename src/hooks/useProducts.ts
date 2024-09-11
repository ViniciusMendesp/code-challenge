import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/axios";

export const useProducts = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => fetchProducts(page, limit),
  });
};
