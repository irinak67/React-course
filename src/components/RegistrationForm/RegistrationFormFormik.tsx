import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import { registrationValidationSchema } from './registrationValidationSchema';
import { PasswordRequirements } from './components/PasswordRequirements';
import { useFormStorage } from './hooks/useFormStorage';
import { useNotificationStore } from '../../store/notificationStore';
import { initialFormValues, type FormikRegistrationValues } from './types/formTypes';
import {
    COUNTRIES,
    GENDER_OPTIONS,
    INTEREST_OPTIONS,
    EXPERIENCE_RANGE,
    FORM_LABELS,
    FORM_TITLES,
    BUTTON_LABELS,
    VALIDATION_MESSAGES,
    FORM_CONFIG,
} from './constants/formConstants';
import styles from './registrationForm.module.css';

const RegistrationFormFormik: React.FC = () => {
    const { saveFormData } = useFormStorage();
    const { addNotification } = useNotificationStore();

    const handleSubmit = async (
        values: FormikRegistrationValues,
        { setSubmitting, resetForm }: FormikHelpers<FormikRegistrationValues>
    ) => {
        try {
            setSubmitting(true);
            saveFormData(values);
            await new Promise((res) => setTimeout(res, FORM_CONFIG.submitDelay));
            console.log('Submitted:', values);

            addNotification({
                type: 'success',
                message: VALIDATION_MESSAGES.success,
                timeout: FORM_CONFIG.toastTimeout,
            });

            setSubmitting(false);
            resetForm();
        } catch {
            addNotification({
                type: 'error',
                message: VALIDATION_MESSAGES.error,
                timeout: FORM_CONFIG.toastTimeout,
            });
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.registrationForm}>
            <div className={`${styles.formTitle} ${styles.formTitleFormik}`}>{FORM_TITLES.formik}</div>
            <Formik<FormikRegistrationValues>
                initialValues={initialFormValues}
                validationSchema={registrationValidationSchema}
                validateOnBlur
                validateOnMount
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, isValid, values, setFieldValue, resetForm }) => (
                    <Form aria-label="Registration form" autoComplete="off">
                        <label htmlFor="fullName">
                            {FORM_LABELS.fullName}*
                            <Field id="fullName" name="fullName" />
                            <ErrorMessage name="fullName" component="span" />
                        </label>
                        <label htmlFor="email">
                            {FORM_LABELS.email}*
                            <Field id="email" name="email" type="email" />
                            <ErrorMessage name="email" component="span" />
                        </label>
                        <label htmlFor="password">
                            {FORM_LABELS.password}*
                            <Field id="password" name="password" type="password" />
                            <ErrorMessage name="password" component="span" />
                        </label>
                        <PasswordRequirements password={values.password} />
                        <label htmlFor="confirmPassword">
                            {FORM_LABELS.confirmPassword}*
                            <Field id="confirmPassword" name="confirmPassword" type="password" />
                            <ErrorMessage name="confirmPassword" component="span" />
                        </label>
                        <label htmlFor="age">
                            {FORM_LABELS.age}*
                            <Field id="age" name="age" type="number" />
                            <ErrorMessage name="age" component="span" />
                        </label>
                        <label htmlFor="birthDate">
                            {FORM_LABELS.birthDate}
                            <Field id="birthDate" name="birthDate" type="date" />
                        </label>
                        <label htmlFor="website">
                            {FORM_LABELS.website}
                            <Field id="website" name="website" type="url" />
                            <ErrorMessage name="website" component="span" />
                        </label>
                        <label htmlFor="country">
                            {FORM_LABELS.country}*
                            <Field id="country" as="select" name="country">
                                {COUNTRIES.map(country => (
                                    <option key={country.value} value={country.value}>{country.label}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="country" component="span" />
                        </label>
                        <label htmlFor="bio">
                            {FORM_LABELS.bio}
                            <Field id="bio" as="textarea" name="bio" maxLength={FORM_CONFIG.bioMaxLength} />
                            <ErrorMessage name="bio" component="span" />
                        </label>
                        <fieldset className={styles.leftFieldset}>
                            <legend>{FORM_LABELS.gender}*</legend>
                            {GENDER_OPTIONS.map(option => (
                                <label key={option.value} htmlFor={`gender-${option.value}-formik`} className={styles.inlineCheckbox}>
                                    <Field id={`gender-${option.value}-formik`} type="radio" name="gender" value={option.value} /> {option.label}
                                </label>
                            ))}
                            <ErrorMessage name="gender" component="span" />
                        </fieldset>
                        <fieldset className={styles.leftFieldset}>
                            <legend>{FORM_LABELS.interests}</legend>
                            {INTEREST_OPTIONS.map(option => (
                                <label key={option.value} htmlFor={`interest-${option.value}-formik`} className={styles.inlineCheckbox}>
                                    <Field id={`interest-${option.value}-formik`} type="checkbox" name="interests" value={option.value} /> {option.label}
                                </label>
                            ))}
                        </fieldset>
                        <div className={styles.experienceWrapper}>
                            <label htmlFor="experience-formik" className={styles.experienceLabel}>{FORM_LABELS.experience}: {values.experience}</label>
                            <input
                                id="experience-formik"
                                type="range"
                                min={EXPERIENCE_RANGE.min}
                                max={EXPERIENCE_RANGE.max}
                                value={values.experience}
                                onChange={e => setFieldValue('experience', Number(e.target.value))}
                                className={styles.experienceRange}
                            />
                            <div className={styles.experienceLabels}>
                                <span>{EXPERIENCE_RANGE.minLabel}</span>
                                <span>{EXPERIENCE_RANGE.maxLabel}</span>
                            </div>
                        </div>
                        <label htmlFor="agree-formik" className={styles.inlineCheckbox}>
                            <Field id="agree-formik" type="checkbox" name="agree" /> {FORM_LABELS.agree}*
                            <ErrorMessage name="agree" component="span" />
                        </label>
                        <div className={styles.buttonGroup}>
                            <button type="submit" disabled={!isValid || isSubmitting} aria-disabled={!isValid || isSubmitting}>
                                {isSubmitting ? BUTTON_LABELS.submitting : BUTTON_LABELS.submit}
                            </button>
                            <button type="button" onClick={() => resetForm()}>
                                {BUTTON_LABELS.reset}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegistrationFormFormik;
