import type { Product } from '../../models/product';
import { ProductCard } from '../ProductCard';
import styles from './products-grid.module.css';

interface ProductsGridProps {
  products: Product[];
}

export const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
