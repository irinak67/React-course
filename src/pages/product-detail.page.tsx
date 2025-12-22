import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import styles from './product-page.module.css';

export const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError, error } = useProduct(id);

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorMessage message={error.message} />;
    if (!data) return null;

    return (
        <div className={styles.productDetail}>
            <Link to="/products" className={styles.productDetailBackLink}>← Back to Catalog</Link>
            <h1 className={styles.productDetailTitle}>{data.title}</h1>
            <img src={data.thumbnail} alt={data.title} className={styles.productDetailImage} />
            <p className={styles.productDetailDescription}>{data.description}</p>
            <h3 className={styles.productDetailPrice}>Price: ${data.price}</h3>
            <p className={styles.productDetailCategory}>Category: {data.category}</p>
        </div>
    );
};