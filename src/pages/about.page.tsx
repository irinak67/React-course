import { TEXTS } from '../constants/texts';
import styles from './about.module.css';

export const AboutPage = () => {
    return (
        <div className={styles.about}>
            <h1 className={styles.aboutTitle}>{TEXTS.about.title}</h1>
            <div className={styles.aboutContent}>
                <p>{TEXTS.about.content.intro}</p>
                <p>{TEXTS.about.content.story}</p>
                <h2 className={styles.aboutSubtitle}>{TEXTS.about.valuesTitle}</h2>
                <ul className={styles.aboutList}>
                    {TEXTS.about.values.map((value, index) => (
                        <li key={index}>{value}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
