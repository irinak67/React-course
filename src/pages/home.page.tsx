import { Link } from 'react-router-dom';
import styles from './home.module.css';

export const HomePage = () => {
    return (
        <div className={styles.home}>
            <h1 className={styles.home__title}>Welcome to Our Store</h1>
            <p className={styles.home__description}>
                Discover amazing products at great prices. Browse our catalog and find exactly what you need.
            </p>
            <Link to="/products" className={styles.home__cta}>
                Browse Products
            </Link>
        </div>
    );
};
