import React, { useEffect, useState } from "react";
import styles from "./NotificationManager.module.scss";
import { motion } from "framer-motion";
export type NotificationType = 'success' | 'error';

export const NotificationModal: React.FC<{
    message: string;
    type: NotificationType;
    onClose: () => void;
}> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            data-testid={type === 'error' ? 'error-toast' : 'success-toast'}
            className={`${styles.notificationModal} ${type === 'success' ? styles.success : styles.error}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.notificationContent}>
                {message}
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
            </div>
        </motion.div>
    );
};

export function useNotification() {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState<NotificationType>('success');

    const showNotificationMessage = (message: string, type: NotificationType) => {
        setNotificationMessage(message);
        setNotificationType(type);
        setShowNotification(true);
    };

    return {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    };
}
