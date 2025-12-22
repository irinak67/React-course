import { Link } from 'react-router-dom';
import type { Product } from '../../models/product';
import { useCart } from '../../hooks/useCart';
import { useNotificationStore } from '../../store/notificationStore';
import { TEXTS } from '../../constants/texts';
import styles from './product-card.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const addNotification = useNotificationStore((state) => state.addNotification);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    });

    addNotification({
      type: 'success',
      message: TEXTS.productCard.addedToCart(product.title),
      timeout: 3000,
    });
  };

  return (
    <div className={styles.productCard}>
      <img src={product.thumbnail} alt={product.title} className={styles.productCardImage} />
      <span className={styles.productCardTitle}>{product.title}</span>
      <p className={styles.productCardPrice}>${product.price}</p>
      <div className={styles.productCardActions}>
        <button onClick={handleAddToCart} className={styles.productCardButton}>
          {TEXTS.productCard.addToCart}
        </button>
        <Link to={`/products/${product.id}`} className={styles.productCardLink}>
          {TEXTS.productCard.details}
        </Link>
      </div>
    </div>
  );
};
