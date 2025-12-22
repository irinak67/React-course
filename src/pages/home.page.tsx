import { Link } from 'react-router-dom';
import { TEXTS } from '../constants/texts';
import styles from './home.module.css';

export const HomePage = () => {
    return (
        <div className={styles.home}>
            <h1 className={styles.homeTitle}>{TEXTS.home.title}</h1>
            <p className={styles.homeDescription}>
                {TEXTS.home.description}
            </p>
            <Link to="/products" className={styles.homeButton}>
                {TEXTS.home.homeButton}
            </Link>
        </div>
    );
};
