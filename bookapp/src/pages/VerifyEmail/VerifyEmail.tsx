import React, {useEffect, useState} from "react";
import styles from "./VerifyEmail.module.scss";
import Logo from "../SetNewPassword/icons/logo.svg";
import MainPic from "../SetNewPassword/icons/mainPic.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {AnimatePresence, motion} from "framer-motion";


interface NotificationModalProps {
    message: string;
    onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);
    return (
        <motion.div
            className={`${styles.notificationModal} ${styles.error}`}
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

export default function VerifyEmail() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const showNotificationMessage = (message: string) => {
        setNotificationMessage(message);
        setShowNotification(true);
    };
    const [emailDir, setEmailDir] = useState<"rtl" | "ltr">("rtl");
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const verifyEmail = async () => {
        if (!isValidEmail(email)) {
            showNotificationMessage("لطفاً یک ایمیل معتبر وارد کنید.");
            return;
        }

        setIsLoading(true);

        try {
            await axios.post(
                `https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/send-verify-code-pass`,
                { email: email },
                { timeout: 10000 }
            );

            navigate("/verifyPass", {
                state: {
                    email: email,
                },
            });
        } catch (error: any) {
            if (error.code === 'ECONNABORTED') {
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.");
            } else {
                showNotificationMessage("مشکلی پیش آمده لطفاً دوباره تلاش کنید.");
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className={styles.VerifyEmailContainer}>
            <AnimatePresence>
                {showNotification && (
                    <NotificationModal
                        message={notificationMessage}
                        onClose={() => setShowNotification(false)}
                    />
                )}
            </AnimatePresence>

            <div className={styles.header}>
                <img src={Logo} alt="Logo" />
                <div className={styles.title}>فراموشی رمز عبور</div>
            </div>

            <div className={styles.content}>
                <div>
                    <img src={MainPic} alt="" />
                </div>

                <div className={styles.emailForm}>
                    <div className={styles.hintPara}>ایمیل خود را جهت دریافت کد تایید وارد کنید</div>

                    <div className={styles.form}>
                        <input
                            className={styles.emailInput}
                            type='email'
                            name="email"
                            id="email"
                            placeholder="ایمیل"
                            dir={emailDir}
                            value={email}
                            onChange={(e) => {
                                const value = e.target.value;
                                setEmail(value);
                                if (value && /^[A-Za-z0-9@._-]/.test(value)) {
                                    setEmailDir("ltr");
                                } else {
                                    setEmailDir("rtl");
                                }
                            }}
                        />

                        <div>
                            <button
                                className={styles.submitBtn}
                                onClick={verifyEmail}
                                disabled={isLoading || !email}
                            >
                                {isLoading ? (
                                    <span className={styles.loadingText}>در حال ارسال</span>
                                ) : (
                                    "ادامه"
                                )}

                            </button>
                        </div>
                    </div>

                    <div className={styles.rememberPass}>
                        رمزت یادت اومد؟ <Link to="/login" className={styles.backToLogin}>بازگشت به صفحه ورود</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
