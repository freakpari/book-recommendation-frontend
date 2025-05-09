import styles from "./chatpage.module.scss";
import notification from "./icon/Notification.svg";
import chat from "./icon/chat.svg";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import userProfile from "./icon/profile.svg";
import { useState } from "react";
import profile2 from "./icon/profile2.svg";
import smile from "./icon/smile.svg";
import { Link } from "react-router-dom";
import empty from "./icon/empty.svg";
export default function Chatpage () {
  const [activeTab, setActiveTab] = useState<'messages' | 'notifications'>('messages');
  const [newMessage, setNewMessage] = useState('');

  const users = [
    { name: 'مریم ساداتی', img: userProfile },
    { name: 'عباس عباسی', img: userProfile },
    { name: 'غلام غلامی', img: userProfile },
    { name: 'سوگل بیگی', img: userProfile },
    { name: 'رعنا آزادی', img: userProfile },
    { name: 'رعنا آزادی', img: userProfile },
    { name: 'مریم ساداتی', img: userProfile },
    { name: 'عباس عباسی', img: userProfile },
    { name: 'غلام غلامی', img: userProfile },
    { name: 'سوگل بیگی', img: userProfile },
    { name: 'رعنا آزادی', img: userProfile },
    { name: 'رعنا آزادی', img: userProfile }

  ];
  const messages = [
    { sender: 'user', text: 'سلام خوبی؟' },
    { sender: 'friend', text: 'سلام خوبم مرسی!' },
    { sender: 'user', text: 'وقت داری درباره شازده کوچولو صحبت کنیم؟' },
    { sender: 'friend', text: 'حتما! من دیشب دوباره این کتاب رو خوندم و هر بار نکته جدیدی ازش درمیارم.' },
    { sender: 'user', text: 'من همیشه فکر می‌کردم داستانش برای کودکانه، ولی الان می‌بینم که لایه‌های عمیق‌تری داره.' },
    { sender: 'friend', text: 'دقیقا برای من، داستان درباره ارزش‌های انسانی و حفظ حس کودکانه توی زندگیه.' },
    { sender: 'user', text: 'درست می‌گی.' }
  ];
  return (
    <>
    <SearchNav />
    <div className={styles.header}>
        <div className={`${styles.headerItem} ${activeTab === 'messages' ? styles.active : ''}`}
          onClick={() => setActiveTab('messages')}>
          <img src={chat} alt="message" />
          <span className={styles.badge}>3</span>

            <span>پیام‌ها</span>
        </div>
        <div className={`${styles.headerItem} ${activeTab === 'notifications' ? styles.active : ''}`}
        onClick={() => setActiveTab('notifications')}>
          <img src={notification} alt="notification" />
          <span className={styles.dot}></span>
          <Link style={{textDecoration:"none",color:"#303857"}} to="/notification">
          <span>اعلان‌ها</span>
          </Link>
        </div>
      </div>
    
      <div className={styles.container}>
      <div className={styles.sidebar}>
        {users.map((user, index) => (
          <div key={index} className={styles.userItem}>
            <img src={user.img} alt={user.name} className={styles.profileImg} />
            {user.name}
          </div>
        ))}
      </div>
      <div className={styles.chatBox}>
      {messages.length === 0 ? (
       <div className={styles.emptyState}>
       <img src={empty} alt="هیچ پیامی نیست" className={styles.emptyIcon} />
       <p className={styles.emptyText}> جایی برای تبادل افکار و تجربه‌ها و البته کتاب‌ها.</p>
    </div>
  ) : (
    <>
        {messages.map((msg, index) => (
          
            <div key={index} className={`${styles.message} ${msg.sender === 'user' ? styles.userMsg : styles.friendMsg}`}>
            {msg.sender === 'user' && <img src={profile2} className={styles.profileImg} alt="user" />}

            <div className={styles.messageText}>{msg.text}</div>

        </div>
        ))}
    </>
      

        )}
        
          <div>

            <input
              type="text"
              placeholder="متن پیام..."
              className={styles.messageInput}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            </div>

      </div>
    </div>
    <Footer />
    </>

  )
}

