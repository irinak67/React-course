import React from 'react';
import { checkPasswordRequirement, passwordRequirements } from '../utils/passwordValidation';
import styles from '../registrationForm.module.css';

interface PasswordRequirementsProps {
    password: string;
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => {
    return (
        <div className={styles.passwordRequirements}>
            <div className={styles.requirementsTitle}>Password requirements:</div>
            {passwordRequirements.map((requirement) => {
                const isMet = checkPasswordRequirement(password, requirement.type);
                return (
                    <div
                        key={requirement.type}
                        className={styles.requirement}
                        data-met={isMet}
                    >
                        <span className={styles.icon}>{isMet ? '✓' : '×'}</span>
                        {requirement.label}
                    </div>
                );
            })}
        </div>
    );
};
