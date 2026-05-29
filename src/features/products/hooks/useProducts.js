import { useQuery } from "@tanstack/react-query"
import {
  fetchProducts,
  fetchProductBySlug,
  fetchRelated,
} from "@/features/products/services/products"

export function useProducts() {
  return useQuery({ queryKey: ["products"], queryFn: fetchProducts })
}

export function useProduct(slug) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug,
  })
}

export function useRelated(product) {
  return useQuery({
    queryKey: ["related", product?.id],
    queryFn: () => fetchRelated(product),
    enabled: !!product,
  })
}
