import React, { useState } from 'react';
import styles from './Notification.module.scss';
import NotificationItem from './NotificationItem';
import Avatar from "./icon/prof.svg";
import SearchNav from '../../components/SearchNav/SearchNav';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import notification from "../chatpage/icon/Notification.svg";
import chat from "../chatpage/icon/chat.svg";
export type Notification = {
  id: number;
  avatar?: string;
  message: string;
};

const notifications: Notification[] = [
  { id: 1, message: 'لطفا در قسمت ویرایش حساب نام کاربری خود را انتخاب کنید.', avatar: Avatar },
  { id: 2, message: 'یک پاسخ جدید به نظر شما توسط سوگل ارسال شده است. برای مشاهده، به بخش نظرات مراجعه کنید.', avatar: Avatar },
  { id: 3, message: 'یک پاسخ جدید به نظر شما توسط غلام ارسال شده است. برای مشاهده، به بخش نظرات مراجعه کنید.', avatar: Avatar },
  { id: 4, message: 'تولدت مبارک! از طرف تیم گرم کتاب بهترین آرزوها را برای شما داریم.', avatar: Avatar },
  { id: 5, message: 'سیستم به‌روزرسانی شد! لطفاً پس از لاگین مجدد از تغییرات مطلع شوید.', avatar: Avatar },
  { id: 6, message: 'فعالیت مشکوکی در حساب شما شناسایی شده است. لطفاً رمز عبور خود را به‌روز کنید.', avatar: Avatar },
  { id: 7, message: 'تولدت مبارک! از طرف تیم گرم کتاب بهترین آرزوها را برای شما داریم.', avatar: Avatar },
  { id: 8, message: 'سیستم به‌روزرسانی شد! لطفاً پس از لاگین مجدد از تغییرات مطلع شوید.', avatar: Avatar },
  { id: 9, message: 'فعالیت مشکوکی در حساب شما شناسایی شده است. لطفاً رمز عبور خود را به‌روز کنید.', avatar: Avatar },

];

const NotificationList: React.FC = () => {
 const [activeTab, setActiveTab] = useState<'messages' | 'notifications'>('messages');
    
  return (
    <>
    <SearchNav />
    <div className={styles.header}>
        <div className={styles.headerItem}
          onClick={() => setActiveTab('messages')}>
          <img src={chat} alt="message" />
          <span className={styles.badge}>3</span>
          <Link style={{textDecoration:"none",color:"#303857"}} to="/chat">

            <span>پیام‌ها</span>
            </Link>

        </div>
        <div className={`${styles.headerItem} ${activeTab === 'notifications' ? styles.active : ''}`}
        onClick={() => setActiveTab('notifications')}>
          <img src={notification} alt="notification" />
          <span className={styles.dot}></span>
          <span>اعلان‌ها</span>
        </div>
      </div>
    <div className={styles.notif}>
    <div className={styles.container}>

      {notifications.map((n) => (
        <NotificationItem key={n.id} message={n.message} avatar={n.avatar} />
      ))}
    </div>
    </div>
    <Footer />
    </>
  );
};

export default NotificationList;
