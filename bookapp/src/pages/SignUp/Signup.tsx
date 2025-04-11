import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import styles from "./Signup.module.scss";
//import svg icons
import Googleicon from "./google.svg";
import eyeIcon from "./visibility.svg";
import eyeCloseIcon from "./visibilityoff.svg"

export default function SignUp() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const changeRoute = (isLoginPage: boolean) => {
    setIsLogin(isLoginPage);
    navigate(isLoginPage ? "/login" : "/signup");
  };

  const isFormValid = () => {
    if (!isLogin) {
      if (!username.trim()) {
        setErrorMessage("همه فیلدها را پر کنید");
        return false;
      }
      if (!confirmPassword.trim()) {
        setErrorMessage("همه فیلدها را پر کنید");
        return false;
      }
      if (password !== confirmPassword) {
        setErrorMessage("رمز عبور و تکرار آن مطابقت ندارند");
        return false;
      }
    }
    if (!email.trim()) {
      setErrorMessage("همه فیلدها را پر کنید");
      return false;
    }
    if (!password.trim()) {
      setErrorMessage("همه فیلدها را پر کنید");
      return false;
    }

    setErrorMessage("");
    return true;
  };


  const handleRegister = async () => {
    if (!isFormValid()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
          "https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/register",
          {
            name: username,
            email: email,
            password: password
          }
      );

      if (response.status === 200) {
        navigate("/verify", { state: { email } });
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage("این کاربر قبلاً ثبت نام کرده است");
        } else {
          setErrorMessage("خطای سرور. لطفاً بعداً تلاش کنید");
        }
      } else {
        setErrorMessage("مشکل در اتصال به اینترنت");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogin = async () => {
    if (!isFormValid()) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
          "https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/login",
          {
            email: email.trim(),
            password: password.trim()
          }
      );

      console.log("Full API Response:", response);

      if (response.status === 201 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        console.log("Stored Token:", localStorage.getItem("token"));
        console.log("Stored User:", localStorage.getItem("user"));

        navigate("/Homepage", { replace: true });

        window.location.reload();
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error: any) {
      console.error("Login Error Details:", error);

      if (error.response) {
        switch (error.response.data?.message) {
          case "User not found":
            setErrorMessage("کاربری با این ایمیل یافت نشد");
            break;
          case "Please verify your email first!":
            setErrorMessage("لطفاً ابتدا ایمیل خود را تأیید کنید");
            break;
          case "Wrong password":
            setErrorMessage("رمز عبور اشتباه است");
            break;
          default:
            setErrorMessage("خطا در ورود. لطفاً مجدداً تلاش کنید");
        }
      } else {
        setErrorMessage("مشکل در ارتباط با سرور");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = () => {
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
      <>
        <img className={styles.logo} src="/logo.svg" alt="Logo" />

        <div className={styles.toggleButtons}>
          <button
              className={!isLogin ? styles.active : ""}
              onClick={() => changeRoute(false)}
          >
            ثبت نام
          </button>
          <button
              className={isLogin ? styles.active : ""}
              onClick={() => changeRoute(true)}
          >
            ورود
          </button>
        </div>

        <div className={`${styles.mainContent} ${isLogin ? styles.reverse : ""}`}>
          <div className={styles.formWrapper}>
            <div className={styles.formContainer}>
              {!isLogin && (
                  <input
                      className={styles.inputgroup}
                      type="text"
                      placeholder="نام کاربری"
                      value={username}
                      onChange={handleChangeUsername}
                  />
              )}
              <input
                  className={styles.inputgroup}
                  type="email"
                  placeholder="ایمیل"
                  value={email}
                  onChange={handleChangeEmail}
              />
              <div className={styles.passwordInput}>
                <input
                    className={styles.inputgroup}
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور"
                    value={password}
                    onChange={handleChangePassword}
                />
                <span className={styles.eyeIconWrapper} onClick={() => setShowPassword(!showPassword)}>
                <img
                    src={showPassword ? eyeIcon : eyeCloseIcon}
                    alt="Eye Icon"
                    className={styles.eyeIcon}
                />
              </span>
              </div>
              {!isLogin && (
                  <div className={styles.passwordInput}>
                    <input
                        className={styles.inputgroup}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="تکرار رمز عبور"
                        value={confirmPassword}
                        onChange={handleChangeConfirmPassword}
                    />
                    <span className={styles.eyeIconWrapper} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <img
                      src={showConfirmPassword ? eyeIcon : eyeCloseIcon}
                      alt="Eye Icon"
                      className={styles.eyeIcon}
                  />
                </span>
                  </div>
              )}
              {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

              <div className={styles.divider}>
                <span className={styles.textdivider}> یا ایجاد حساب با</span>
              </div>
              <button className={styles.googleButton} onClick={() => loginWithGoogle()}>
                Google
                <img className={styles.GoogleIcon} src={Googleicon} alt="google icon" />
              </button>
              <button
                  onClick={handleSubmit}
                  className={styles.submitButton}
                  disabled={isLoading}
              >
                {isLoading ? "لطفاً صبر کنید..." : "ادامه"}
              </button>
            </div>

            <p className={styles.loginLink}>
              {isLogin ? "حساب کاربری ندارید؟ " : "از قبل حساب دارید؟ "}
              <span className={styles.logintext} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "ثبت نام کنید" : "وارد حساب خود شوید"}
            </span>
            </p>
          </div>

          <img
              className={`${styles.imageContainer} ${isLogin ? styles.isLoginImage : ""}`}
              src={isLogin ? "/revers.svg" : "/simple.svg"}
              alt="Illustration"
          />
        </div>
      </>
  );
}