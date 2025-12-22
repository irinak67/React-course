import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/products.api';

interface UseProductsOptions {
  search?: string;
  category?: string;
  limit?: number;
}

export const useProducts = (options?: UseProductsOptions) => {
  const { search = '', category = '', limit = 30 } = options || {};

  return useQuery({
    queryKey: ['products', { search, category, limit }],
    queryFn: () => fetchProducts({ search, category, limit }),
    staleTime: 1000 * 60 * 5,
  });
};
