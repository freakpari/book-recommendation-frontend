import styles from "./Authpage.module.scss";
import React from "react";
import LightLogo from './lightlogo.png';
import { Link } from 'react-router-dom';



const AuthPage: React.FC = () => {
return (
    <div className={styles.authContainer}>
    <div className={styles.authContent}>
        <div className={styles.logo}>
        <img className={styles.img} src={LightLogo} alt=""/>
        </div>
        <h2 className={styles.tagline}>هوشمندانه بخوان، عمیق‌تر کشف کن</h2>
        <div className={styles.buttons}>
            <Link to="/signup" className={`${styles.btn} ${styles.primary}`}>  ورود    |    ثبت نام</Link>
        </div>
        <p className={styles.guest}>
        <Link to="/Homepage" className={styles.guest}>ادامه به عنوان مهمان</Link>
</p>    </div>
    </div>
);
};

export default AuthPage;
