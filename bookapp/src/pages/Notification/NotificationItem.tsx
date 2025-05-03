import React from 'react';
import styles from './Notification.module.scss';

type Props = {
  avatar?: string;
  message: string;
};

const NotificationItem: React.FC<Props> = ({ avatar, message }) => {
  return (
    <div className={styles.item}>
      {avatar && <img src={avatar} alt="icon" className={styles.avatar} />}
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default NotificationItem;
