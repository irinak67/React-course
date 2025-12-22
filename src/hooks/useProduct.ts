import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../services/products.api';

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });
};
