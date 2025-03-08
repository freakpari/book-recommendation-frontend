import { useState } from "react";
import styles from "./Signup.module.scss";

export default function SignUp() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="Logo" />
        </div>
        <div className={styles.toggleButtons}>
          <button
            className={!isLogin ? styles.active : ""}
            onClick={() => setIsLogin(false)}
          >
            ثبت نام
          </button>
          <button
            className={isLogin ? styles.active : ""}
            onClick={() => setIsLogin(true)}
          >
            ورود
          </button>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.formWrapper}>
          <div className={styles.formContainer}>
            {!isLogin && <input  className={styles.inputgroup} type="text" placeholder="نام کاربری" />}
            <input className={styles.inputgroup} type="email" placeholder="ایمیل" />
            <div className={styles.passwordInput}>
              <input className={styles.inputgroup} type={showPassword ? "text" : "password"} placeholder="رمز عبور" />
              <span onClick={() => setShowPassword(!showPassword)}></span>
            </div>
            {!isLogin && (
              <div className={styles.passwordInput}>
                <input  className={styles.inputgroup} type={showConfirmPassword ? "text" : "password"} placeholder="تکرار رمز عبور" />
                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}></span>
              </div>
            )}
            <div className={styles.divider}>یا ایجاد حساب با</div>
            <button className={styles.googleButton}>Google</button>
            <button className={styles.submitButton}>ادامه</button>
          </div>
          <p className={styles.loginLink}>
            از قبل حساب دارید؟ <span onClick={() => setIsLogin(true)}>وارد حساب خود شوید</span>
          </p>
        </div>
        <img className={styles.imageContainer} src="/book.png" alt="Illustration" />
      </div>
    </div>
  );
}
