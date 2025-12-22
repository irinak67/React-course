import { Link } from 'react-router-dom';
import type { Product } from '../../models/product';
import styles from './product-card.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={styles.productCard}>
      <img src={product.thumbnail} alt={product.title} className={styles.productCardImage} />
      <span className={styles.productCardTitle}>{product.title}</span>
      <p className={styles.productCardPrice}>${product.price}</p>
      <Link to={`/products/${product.id}`} className={styles.productCardLink}>
        View Details
      </Link>
    </div>
  );
};
