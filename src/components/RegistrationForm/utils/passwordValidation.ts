export type PasswordRequirementType = 
    | 'length' 
    | 'digit' 
    | 'special' 
    | 'topRow' 
    | 'middleRow' 
    | 'bottomRow';

export const checkPasswordRequirement = (password: string, type: PasswordRequirementType): boolean => {
    switch (type) {
        case 'length':
            return password.length >= 10;
        case 'digit':
            return /[0-9]/.test(password);
        case 'special':
            return /[!@#$%^&*(),.?":{}|<>]/.test(password);
        case 'topRow':
            return /[qwertyQWERTY]/.test(password);
        case 'middleRow':
            return /[asdfghASDFGH]/.test(password);
        case 'bottomRow':
            return /[zxcvbnZXCVBN]/.test(password);
        default:
            return false;
    }
};

export const passwordRequirements = [
    { type: 'length' as const, label: 'At least 10 characters' },
    { type: 'digit' as const, label: 'Contains a digit (0-9)' },
    { type: 'special' as const, label: 'Contains a special character (!@#$%...)' },
    { type: 'topRow' as const, label: 'Contains a letter from top row (QWERTY)' },
    { type: 'middleRow' as const, label: 'Contains a letter from middle row (ASDFGH)' },
    { type: 'bottomRow' as const, label: 'Contains a letter from bottom row (ZXCVBN)' },
];
