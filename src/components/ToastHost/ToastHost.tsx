import { useNotificationStore } from '../../store/notificationStore';
import styles from './ToastHost.module.css';

export const ToastHost = () => {
    const { notifications, removeNotification } = useNotificationStore();

    if (notifications.length === 0) return null;

    return (
        <div className={styles.toastContainer}>
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`${styles.toast} ${styles[`toast--${notification.type}`]}`}
                >
                    <div className={styles.toastIcon}>
                        {notification.type === 'success' && '✓'}
                        {notification.type === 'error' && '✕'}
                        {notification.type === 'info' && 'ℹ'}
                    </div>
                    <p className={styles.toastMessage}>{notification.message}</p>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className={styles.toastClose}
                        aria-label="Close notification"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
};
