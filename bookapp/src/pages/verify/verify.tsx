import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./verify.module.scss";
import axios from "axios";

export default function Verify() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";

    const changeRoute = (isLoginPage: boolean) => {
        setIsLogin(isLoginPage);
        navigate(isLoginPage ? "/login" : "/signup"); 
    };

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return; 
    
        const newOtp = [...otp];
        newOtp[index] = value.slice(0, 1);
        setOtp(newOtp);
    
        if (value && index < 6) {
            inputsRef.current[index + 1]?.focus(); 
        }
    };
    
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            if (index < 5) {
                inputsRef.current[index - 1]?.focus(); 
            }
        } else if (e.key === "Backspace") {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };
    
    const isOtpComplete = otp.every((digit) => digit !== "");

    const handleSubmit = async () => {
        if (!isOtpComplete) {
            setErrorMessage("لطفا تمام فیلدها را پر کنید.");
            return;
        }
        
        const enteredOtp = otp.join("");
        setIsLoading(true);
        
        try {
            const response = await axios.post(
                "https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/verify-code",
                {
                    email: email,
                    code: enteredOtp
                }
            );
            
            if (response.status === 200) {
                navigate("/", { 
                    state: { 
                        message: "حساب شما با موفقیت تأیید شد. لطفاً وارد شوید." 
                    } 
                });
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400) {
                    setErrorMessage("کد وارد شده اشتباه است. لطفاً دوباره تلاش کنید.");
                } else {
                    setErrorMessage("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
                }
            } else {
                setErrorMessage("اتصال اینترنت خود را بررسی کنید.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        try {
            const response = await axios.post(
                "https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/resend-code",
                { email: email }
            );
            
            if (response.status === 200) {
                setErrorMessage("");
                alert("کد جدید با موفقیت ارسال شد.");
            }
        } catch (error) {
            setErrorMessage("خطا در ارسال مجدد کد. لطفاً دوباره تلاش کنید.");
        }
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
            <div className={styles.mainContent}>
                <div className={styles.validForm}>
                    <div className={styles.textheader}>
                        <h2>کد ارسال شده به ایمیل خود را وارد کنید</h2>
                        {email && <p className={styles.emailText}>{email}</p>}
                    </div>
                    <div className={styles.otpContainer}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(el) => {
                                    inputsRef.current[index] = el;
                                }}
                                className={styles.otpInput}
                                autoFocus={index === 0 && otp.every(digit => digit === "")}
                            />
                        ))}
                    </div>
                    {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
                    <button 
                        className={styles.confirmButton} 
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "لطفاً صبر کنید..." : "تأیید"}
                    </button>
                    <p className={styles.resendText}>
                        کد هنوز نیومده؟{" "}
                        <span 
                            className={styles.resendLink} 
                            onClick={handleResendCode}
                        >
                            ارسال مجدد کد
                        </span>
                    </p>
                </div>
                <img className={styles.imageContainer} src="/simple.svg" alt="book icon" />
            </div>
        </>
    );
}