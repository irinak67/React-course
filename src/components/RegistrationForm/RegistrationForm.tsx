import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { registrationSchema, type RegistrationFormData } from './schemas/registrationSchema';
import { PasswordRequirements } from './components/PasswordRequirements';
import { useFormStorage } from './hooks/useFormStorage';
import { useNotificationStore } from '../../store/notificationStore';
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

const defaultValues: Partial<RegistrationFormData> = {
    interests: [],
    experience: 0,
};

const RegistrationForm: React.FC = () => {
    const { saveFormData } = useFormStorage();
    const { addNotification } = useNotificationStore();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        control,
        reset,
    } = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        mode: 'onBlur',
        defaultValues,
    });

    const password = useWatch({ control, name: 'password' }) || '';
    const experienceValue = useWatch({ control, name: 'experience' });

    const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
        try {
            await new Promise((res) => setTimeout(res, FORM_CONFIG.submitDelay));
            saveFormData(data);
            console.log('Submitted:', data);

            addNotification({
                type: 'success',
                message: VALIDATION_MESSAGES.success,
                timeout: FORM_CONFIG.toastTimeout,
            });

            reset();
        } catch {
            addNotification({
                type: 'error',
                message: VALIDATION_MESSAGES.error,
                timeout: FORM_CONFIG.toastTimeout,
            });
        }
    };

    return (
        <div className={styles.registrationForm}>
            <div className={`${styles.formTitle} ${styles.formTitleRhf}`}>{FORM_TITLES.rhf}</div>
            <form onSubmit={handleSubmit(onSubmit)} aria-label="Registration form" autoComplete="off">
                <label htmlFor="fullName">
                    {FORM_LABELS.fullName}*
                    <input id="fullName" {...register('fullName')} aria-invalid={!!errors.fullName} />
                    {errors.fullName && <span>{errors.fullName.message}</span>}
                </label>
                <label htmlFor="email">
                    {FORM_LABELS.email}*
                    <input id="email" type="email" {...register('email')} aria-invalid={!!errors.email} />
                    {errors.email && <span>{errors.email.message}</span>}
                </label>
                <label htmlFor="password">
                    {FORM_LABELS.password}*
                    <input id="password" type="password" {...register('password')} aria-invalid={!!errors.password} />
                    {errors.password && <span>{errors.password.message}</span>}
                </label>
                <PasswordRequirements password={password} />
                <label htmlFor="confirmPassword">
                    {FORM_LABELS.confirmPassword}*
                    <input id="confirmPassword" type="password" {...register('confirmPassword')} aria-invalid={!!errors.confirmPassword} />
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                </label>
                <label htmlFor="age">
                    {FORM_LABELS.age}*
                    <input id="age" type="number" {...register('age', { valueAsNumber: true })} aria-invalid={!!errors.age} />
                    {errors.age && <span>{errors.age.message}</span>}
                </label>
                <label htmlFor="birthDate">
                    {FORM_LABELS.birthDate}
                    <input id="birthDate" type="date" {...register('birthDate')} />
                </label>
                <label htmlFor="website">
                    {FORM_LABELS.website}
                    <input id="website" type="url" {...register('website')} aria-invalid={!!errors.website} />
                    {errors.website && <span>{errors.website.message}</span>}
                </label>
                <label htmlFor="country">
                    {FORM_LABELS.country}*
                    <select id="country" {...register('country')} aria-invalid={!!errors.country}>
                        {COUNTRIES.map(country => (
                            <option key={country.value} value={country.value}>{country.label}</option>
                        ))}
                    </select>
                    {errors.country && <span>{errors.country.message}</span>}
                </label>
                <label htmlFor="bio">
                    {FORM_LABELS.bio}
                    <textarea id="bio" {...register('bio')} maxLength={FORM_CONFIG.bioMaxLength} />
                    {errors.bio && <span>{errors.bio.message}</span>}
                </label>
                <fieldset className={styles.leftFieldset}>
                    <legend>{FORM_LABELS.gender}*</legend>
                    {GENDER_OPTIONS.map(option => (
                        <label key={option.value} htmlFor={`gender-${option.value}`} className={styles.inlineCheckbox}>
                            <input id={`gender-${option.value}`} type="radio" value={option.value} {...register('gender')} /> {option.label}
                        </label>
                    ))}
                    {errors.gender && <span>{errors.gender.message}</span>}
                </fieldset>
                <fieldset className={styles.leftFieldset}>
                    <legend>{FORM_LABELS.interests}</legend>
                    {INTEREST_OPTIONS.map(option => (
                        <label key={option.value} htmlFor={`interest-${option.value}`} className={styles.inlineCheckbox}>
                            <input id={`interest-${option.value}`} type="checkbox" value={option.value} {...register('interests')} /> {option.label}
                        </label>
                    ))}
                </fieldset>
                <div className={styles.experienceWrapper}>
                    <label htmlFor="experience" className={styles.experienceLabel}>{FORM_LABELS.experience}: {experienceValue || 0}</label>
                    <input
                        id="experience"
                        type="range"
                        min={EXPERIENCE_RANGE.min}
                        max={EXPERIENCE_RANGE.max}
                        {...register('experience', { valueAsNumber: true })}
                        className={styles.experienceRange}
                    />
                    <div className={styles.experienceLabels}>
                        <span>{EXPERIENCE_RANGE.minLabel}</span>
                        <span>{EXPERIENCE_RANGE.maxLabel}</span>
                    </div>
                </div>
                <label htmlFor="agree" className={styles.inlineCheckbox}>
                    <input id="agree" type="checkbox" {...register('agree')} /> {FORM_LABELS.agree}*
                    {errors.agree && <span>{errors.agree.message}</span>}
                </label>
                <div className={styles.buttonGroup}>
                    <button type="submit" disabled={!isValid || isSubmitting} aria-disabled={!isValid || isSubmitting}>
                        {isSubmitting ? BUTTON_LABELS.submitting : BUTTON_LABELS.submit}
                    </button>
                    <button type="button" onClick={() => reset()}>
                        {BUTTON_LABELS.reset}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
