import { z } from 'zod';

export const registrationSchema = z.object({
    fullName: z.string().min(2, 'Full Name is required'),
    email: z.email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(10, 'Password must be at least 10 characters')
        .regex(/[0-9]/, 'Password must contain a digit')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain a special character')
        .regex(/[qwertyQWERTY]/, 'Password must contain a letter from top row (QWERTY)')
        .regex(/[asdfghASDFGH]/, 'Password must contain a letter from middle row (ASDFGH)')
        .regex(/[zxcvbnZXCVBN]/, 'Password must contain a letter from bottom row (ZXCVBN)'),
    confirmPassword: z.string(),
    age: z.number().min(1, 'Age must be between 1 and 120').max(120, 'Age must be between 1 and 120'),
    birthDate: z.string().refine(
        (val) => !val || new Date(val).getFullYear() <= new Date().getFullYear() - 1,
        'Birth date cannot be in the future'
    ),
    website: z.url({ message: 'Invalid URL' }).optional().or(z.literal('')),
    country: z.string().min(1, 'Country is required'),
    bio: z.string().max(500, 'Bio must not exceed 500 characters').optional(),
    gender: z.string().min(1, 'Please select a gender'),
    interests: z.array(z.string()).optional(),
    experience: z.number().min(0).max(30),
    agree: z.literal(true, { message: 'You must agree to the Terms and Conditions' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
