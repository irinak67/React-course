import { useState, useEffect, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { ProductsGrid } from '../components/ProductsGrid';
import { useNotificationStore } from '../store/notificationStore';
import { TEXTS } from '../constants/texts';
import styles from './product-page.module.css';

export const ProductsList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const addNotification = useNotificationStore((state) => state.addNotification);

    const { data: allData } = useProducts({});

    const { data, isLoading, isError, error } = useProducts({ search });

    const categories = useMemo(() => {
        if (!allData?.products) return [];
        const uniqueCategories = new Set(allData.products.map(p => p.category));
        return Array.from(uniqueCategories).sort();
    }, [allData]);

    const filteredProducts = useMemo(() => {
        if (!data?.products) return [];
        if (!selectedCategory) return data.products;
        return data.products.filter(p => p.category === selectedCategory);
    }, [data, selectedCategory]);

    useEffect(() => {
        if (isError && error) {
            addNotification({
                type: 'error',
                message: TEXTS.notifications.loadError(error.message),
                timeout: 5000,
            });
        }
    }, [isError, error, addNotification]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchQuery);
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorMessage message={error.message} />;
    if (!data) return null;

    return (
        <div className={styles.productsList}>
            <h1 className={styles.productsListTitle}>{TEXTS.products.title}</h1>

            <div className={styles.filters}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder={TEXTS.products.search.placeholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        {TEXTS.products.search.button}
                    </button>
                </form>

                <div className={styles.categoryFilter}>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={styles.categorySelect}
                    >
                        <option value="">{TEXTS.products.category.all}</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {String(category).replace(/-/g, ' ').charAt(0).toUpperCase() + String(category).replace(/-/g, ' ').slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {(search || selectedCategory) && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearch('');
                            setSearchQuery('');
                            setSelectedCategory('');
                        }}
                        className={styles.clearButton}
                    >
                        {TEXTS.products.search.clearButton}
                    </button>
                )}
            </div>

            {(search || selectedCategory) && (
                <p className={styles.searchInfo}>
                    {search && <span>{TEXTS.products.results.searchLabel} <strong>{search}</strong></span>}
                    {search && selectedCategory && <span> • </span>}
                    {selectedCategory && <span>{TEXTS.products.category.label} <strong>{selectedCategory}</strong></span>}
                    {data?.products && <span> {TEXTS.products.results.found(filteredProducts.length)}</span>}
                </p>
            )}

            {data?.products && <ProductsGrid products={filteredProducts} />}
        </div>
    );
};