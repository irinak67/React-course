/**
 * Country options for registration form
 */
export const COUNTRIES = [
    { value: '', label: '-- Select a country --' },
    { value: 'il', label: 'Israel' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
] as const;

/**
 * Gender options for registration form
 */
export const GENDER_OPTIONS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'preferNot', label: 'Prefer not to say' },
] as const;

/**
 * Interest options for registration form
 */
export const INTEREST_OPTIONS = [
    { value: 'sports', label: 'Sports' },
    { value: 'music', label: 'Music' },
    { value: 'technology', label: 'Technology' },
    { value: 'reading', label: 'Reading' },
    { value: 'travel', label: 'Travel' },
] as const;

/**
 * Experience range configuration
 */
export const EXPERIENCE_RANGE = {
    min: 0,
    max: 30,
    minLabel: '0 years',
    maxLabel: '30+ years',
} as const;

/**
 * Form field labels
 */
export const FORM_LABELS = {
    fullName: 'Full Name',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    age: 'Age',
    birthDate: 'Birth Date',
    website: 'Website',
    country: 'Country',
    bio: 'Bio',
    gender: 'Gender',
    interests: 'Interests (optional)',
    experience: 'Years of Experience',
    agree: 'I agree to the Terms and Conditions',
} as const;

/**
 * Form titles
 */
export const FORM_TITLES = {
    rhf: 'React Hook Form + Zod',
    formik: 'Formik + Yup',
} as const;

/**
 * Button labels
 */
export const BUTTON_LABELS = {
    submit: 'Submit Form',
    submitting: 'Submitting...',
    reset: 'Reset Form',
} as const;

/**
 * Validation messages
 */
export const VALIDATION_MESSAGES = {
    success: 'Registration form submitted successfully!',
    error: 'Failed to submit form. Please try again.',
} as const;

/**
 * Form metadata
 */
export const FORM_CONFIG = {
    storageKey: 'registrationForm',
    submitDelay: 1000,
    toastTimeout: 5000,
    bioMaxLength: 500,
} as const;

/**
 * Error messages for console/debugging
 */
export const ERROR_MESSAGES = {
    savingToStorage: 'Error saving form data to localStorage:',
    clearingStorage: 'Error clearing form data from localStorage:',
} as const;
