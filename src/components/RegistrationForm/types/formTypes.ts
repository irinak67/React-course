export interface FormikRegistrationValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    age: number | string;
    birthDate: string;
    website: string;
    country: string;
    bio: string;
    gender: string;
    interests: string[];
    experience: number;
    agree: boolean;
    [key: string]: string | number | boolean | string[];
}

export const initialFormValues: FormikRegistrationValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    birthDate: '',
    website: '',
    country: '',
    bio: '',
    gender: '',
    interests: [],
    experience: 0,
    agree: false,
};
