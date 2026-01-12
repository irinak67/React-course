import { useCallback } from 'react';
import { FORM_CONFIG, ERROR_MESSAGES } from '../constants/formConstants';
import { omit } from '../utils/objectHelpers';

export const useFormStorage = () => {
    const saveFormData = useCallback((data: Record<string, unknown>) => {
        try {
            // Remove sensitive data before saving
            const safeData = omit(data, ['password', 'confirmPassword']);
            
            localStorage.setItem(FORM_CONFIG.storageKey, JSON.stringify(safeData));
        } catch (error) {
            console.error(ERROR_MESSAGES.savingToStorage, error);
        }
    }, []);

    const clearFormData = useCallback(() => {
        try {
            localStorage.removeItem(FORM_CONFIG.storageKey);
        } catch (error) {
            console.error(ERROR_MESSAGES.clearingStorage, error);
        }
    }, []);

    return { saveFormData, clearFormData };
};
