import styles from "./Authpage.module.scss";
import React from "react";
import LightLogo from './lightlogo.png';


const AuthPage: React.FC = () => {
return (
    <div className={styles.authContainer}>
    <div className={styles.authContent}>
        <div className={styles.logo}>
        <img className={styles.img} src={LightLogo} alt=""/>
        </div>
        <h2 className={styles.tagline}>هوشمندانه بخوان، عمیق‌تر کشف کن</h2>
        <div className={styles.buttons}>
            <button className={`${styles.btn} ${styles.primary}`}>ثبت نام</button>
            <button className={`${styles.btn} ${styles.secondary}`}>ورود</button>
        </div>
        <p className={styles.guest}>ادامه به عنوان مهمان</p>
    </div>
    </div>
);
};

export default AuthPage;
