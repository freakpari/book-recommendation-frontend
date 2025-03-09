import { useState } from "react";
import styles from "./Signup.module.scss";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import Googleicon from "./google.svg";

export default function SignUp() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Token:", tokenResponse);
      
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }
      );

      console.log("User Info:", userInfo.data);
    },
    onError: (error) => console.log("Login Failed:", error),
  });
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
            <div className={styles.divider}>
              <span className={styles.textdivider}> یا ایجاد حساب با</span>
              </div>
            
            <button className={styles.googleButton} onClick={() => loginWithGoogle()}>
              Google
              <img className={styles.GoogleIcon} src={Googleicon} alt="google icon" />
            </button>
            <button className={styles.submitButton}>ادامه</button>
          </div>
          <p className={styles.loginLink}>
            از قبل حساب دارید؟ <span className={styles.logintext} onClick={() => setIsLogin(true)}>وارد حساب خود شوید</span>
          </p>
        </div>
        <img className={styles.imageContainer} src="/book.png" alt="Illustration" />
      </div>
    </div>
  );
}
