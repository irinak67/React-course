import styles from './about.module.css';

export const AboutPage = () => {
  return (
    <div className={styles.about}>
      <h1 className={styles.about__title}>About Us</h1>
      <div className={styles.about__content}>
        <p>
          We are a modern e-commerce platform dedicated to bringing you the best products
          at competitive prices. Our mission is to make online shopping easy, fast, and enjoyable.
        </p>
        <p>
          Founded in 2024, we've grown to serve thousands of satisfied customers worldwide.
          We believe in quality, transparency, and excellent customer service.
        </p>
        <h2 className={styles.about__subtitle}>Our Values</h2>
        <ul className={styles.about__list}>
          <li>Customer satisfaction first</li>
          <li>Quality products</li>
          <li>Fast and reliable shipping</li>
          <li>Transparent pricing</li>
        </ul>
      </div>
    </div>
  );
};
