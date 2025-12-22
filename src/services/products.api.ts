import type { Product, ProductsResponse } from '../models/product';

const API_BASE_URL = 'https://dummyjson.com';

interface FetchProductsOptions {
  search?: string;
  category?: string;
  limit?: number;
}

export const fetchProducts = async (options?: FetchProductsOptions): Promise<ProductsResponse> => {
  const { search = '', category = '', limit = 30 } = options || {};
  
  let url = `${API_BASE_URL}/products`;
  
  if (search) {
    url = `${API_BASE_URL}/products/search?q=${encodeURIComponent(search)}`;
  } else if (category) {
    url = `${API_BASE_URL}/products/category/${encodeURIComponent(category)}`;
  }
  
  url += search || category ? `&limit=${limit}` : `?limit=${limit}`;
  
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error('Problem fetching product');
  }
  return res.json();
};

export const fetchCategories = async (): Promise<string[]> => {
  const res = await fetch(`${API_BASE_URL}/products/categories`);
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
};
