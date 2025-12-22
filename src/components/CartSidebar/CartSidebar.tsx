import { useCart } from '../../hooks/useCart';
import styles from './CartSidebar.module.css';

export const CartSidebar = () => {
    const { isOpen, items, close, removeItem, clearCart, getTotalPrice, getTotalItems } = useCart();

    if (!isOpen) return null;

    return (
        <>
            <div className={styles.overlay} onClick={close} />
            <aside className={styles.sidebar}>
                <div className={styles.header}>
                    <h2>Shopping Cart ({getTotalItems()})</h2>
                    <button onClick={close} className={styles.closeButton}>
                        ✕
                    </button>
                </div>

                <div className={styles.content}>
                    {items.length === 0 ? (
                        <div className={styles.empty}>
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.items}>
                                {items.map((item) => (
                                    <div key={item.id} className={styles.item}>
                                        <img src={item.thumbnail} alt={item.title} className={styles.itemImage} />
                                        <div className={styles.itemInfo}>
                                            <h4>{item.title}</h4>
                                            <p className={styles.itemPrice}>
                                                ${item.price} × {item.quantity}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className={styles.removeButton}
                                            aria-label="Remove item"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.footer}>
                                <div className={styles.total}>
                                    <span>Total:</span>
                                    <span className={styles.totalPrice}>${getTotalPrice().toFixed(2)}</span>
                                </div>
                                <button onClick={clearCart} className={styles.clearButton}>
                                    Clear Cart
                                </button>
                                <button className={styles.checkoutButton}>
                                    Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </aside>
        </>
    );
};
