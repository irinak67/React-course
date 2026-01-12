import * as Yup from 'yup';

/**
 * Yup validation schema for Formik registration form
 * Must match registrationSchema.ts requirements for consistency
 */
export const registrationValidationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Full Name is required')
    .required('Full Name is required'),
  
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  
  password: Yup.string()
    .min(10, 'Password must be at least 10 characters')
    .matches(/[0-9]/, 'Password must contain a digit')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain a special character')
    .matches(/[qwertyQWERTY]/, 'Password must contain a letter from top row (QWERTY)')
    .matches(/[asdfghASDFGH]/, 'Password must contain a letter from middle row (ASDFGH)')
    .matches(/[zxcvbnZXCVBN]/, 'Password must contain a letter from bottom row (ZXCVBN)')
    .required('Password is required'),
  
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm Password is required'),
  
  age: Yup.number()
    .min(1, 'Age must be between 1 and 120')
    .max(120, 'Age must be between 1 and 120')
    .required('Age is required'),
  
  birthDate: Yup.date()
    .max(new Date(), 'Birth date cannot be in the future')
    .nullable(),
  
  website: Yup.string()
    .url('Invalid URL')
    .nullable(),
  
  country: Yup.string()
    .min(1, 'Country is required')
    .required('Country is required'),
  
  bio: Yup.string()
    .max(500, 'Bio must not exceed 500 characters')
    .nullable(),
  
  gender: Yup.string()
    .required('Please select a gender'),
  
  interests: Yup.array()
    .of(Yup.string()),
  
  experience: Yup.number()
    .min(0)
    .max(30),
  
  agree: Yup.boolean()
    .oneOf([true], 'You must agree to the Terms and Conditions')
    .required('You must agree to the Terms and Conditions'),
});
