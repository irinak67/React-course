import React from 'react';
import RegistrationForm, { RegistrationFormFormik } from '../components/RegistrationForm';
import styles from './register.module.css';

type FormVariant = 'rhf' | 'formik';

const RegisterPage: React.FC = () => {
    const [variant, setVariant] = React.useState<FormVariant>('rhf');

    return (
        <main className={styles.registerPage}>
            <header className={styles.header}>
                <h1>Registration Form</h1>
                <p className={styles.subtitle}>
                    Compare two modern form libraries: React Hook Form + Zod vs Formik + Yup
                </p>
            </header>

            <div className={styles.toggleContainer}>
                <button
                    type="button"
                    onClick={() => setVariant('rhf')}
                    className={`${styles.toggleButton} ${variant === 'rhf' ? styles.active : ''}`}
                    aria-pressed={variant === 'rhf'}
                >
                    React Hook Form + Zod
                </button>
                <button
                    type="button"
                    onClick={() => setVariant('formik')}
                    className={`${styles.toggleButton} ${variant === 'formik' ? styles.active : ''}`}
                    aria-pressed={variant === 'formik'}
                >
                    Formik + Yup
                </button>
            </div>

            <div className={styles.formContainer}>
                {variant === 'rhf' ? <RegistrationForm /> : <RegistrationFormFormik />}
            </div>
        </main>
    );
};

export default RegisterPage;
