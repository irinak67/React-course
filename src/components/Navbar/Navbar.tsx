import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { ThemeToggle } from '../ThemeToggle';
import { TEXTS } from '../../constants/texts';
import styles from './Navbar.module.css';

export const Navbar = () => {
    const { toggle, getTotalItems } = useCart();
    const itemCount = getTotalItems();

    return (
        <header className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <Link to="/" className={styles.navbarLogo}>
                    {TEXTS.header.logo}
                </Link>
                <nav className={styles.navbarNav}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? `${styles.navbarLink} ${styles.navbarLinkActive}` : styles.navbarLink
                        }
                    >
                        {TEXTS.header.nav.home}
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            isActive ? `${styles.navbarLink} ${styles.navbarLinkActive}` : styles.navbarLink
                        }
                    >
                        {TEXTS.header.nav.products}
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? `${styles.navbarLink} ${styles.navbarLinkActive}` : styles.navbarLink
                        }
                    >
                        {TEXTS.header.nav.about}
                    </NavLink>
                </nav>
                <div className={styles.navbarActions}>
                    <ThemeToggle />
                    <button onClick={toggle} className={styles.navbarCart}>
                        {TEXTS.header.cart}
                        {itemCount > 0 && (
                            <span className={styles.navbarCartBadge}>{itemCount}</span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
