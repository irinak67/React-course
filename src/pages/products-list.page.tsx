import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { ProductsGrid } from '../components/ProductsGrid';
import styles from './product-page.module.css';

export const ProductsList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [search, setSearch] = useState('');

    const { data, isLoading, isError, error } = useProducts({ search });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchQuery);
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorMessage message={error.message} />;
    if (!data) return null;

    return (
        <div className={styles.productsList}>
            <h1 className={styles.productsListTitle}>Catalog</h1>

            <form onSubmit={handleSearch} className={styles.searchForm}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                    Search
                </button>
                {search && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearch('');
                            setSearchQuery('');
                        }}
                        className={styles.clearButton}
                    >
                        Clear
                    </button>
                )}
            </form>

            {search && (
                <p className={styles.searchInfo}>
                    Search results for: <strong>{search}</strong> ({data.products.length} found)
                </p>
            )}

            <ProductsGrid products={data.products} />
        </div>
    );
};