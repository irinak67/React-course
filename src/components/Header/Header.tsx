import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logo}>
          ShopLogo
        </Link>
        <nav className={styles.header__nav}>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? `${styles.header__link} ${styles['header__link--active']}` : styles.header__link
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/products" 
            className={({ isActive }) => 
              isActive ? `${styles.header__link} ${styles['header__link--active']}` : styles.header__link
            }
          >
            Products
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              isActive ? `${styles.header__link} ${styles['header__link--active']}` : styles.header__link
            }
          >
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
