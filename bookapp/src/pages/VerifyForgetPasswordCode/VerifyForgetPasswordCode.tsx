import React, {useEffect, useRef, useState} from "react";
import styles from "./VerifyForgetPasswordCode.module.scss";
import Logo from "../SetNewPassword/icons/logo.svg";
import MainPic from "../SetNewPassword/icons/mainPic.svg";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {AnimatePresence, motion} from "framer-motion";


interface NotificationModalProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);
    return (
        <motion.div
            className={`${styles.notificationModal} ${type === 'success' ? styles.success : styles.error}`}
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

export default function VerifyForgetPasswordCode() {

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const location = useLocation();
    const email = location.state?.email || "";
    const isOtpComplete = otp.every((digit) => digit !== "");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingReSend, setIsLoadingReSend] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
    const showNotificationMessage = (message: string, type: 'success' | 'error') => {
        setNotificationMessage(message);
        setNotificationType(type);
        setShowNotification(true);
    };

    useEffect(() => {
        if (otp.every((digit) => digit !== "")) {
            verifyCode();
        }
    }, [otp]);

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

    const verifyCode = async () => {
        if (!isOtpComplete) {
            showNotificationMessage("لطفا تمام فیلدها را پر کنید.", 'error');
            return;
        }

        setIsLoading(true);
        const enteredOtp = otp.join("");

        try {
             await axios.post(
                 `https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/verify-code-pass`,
                    {
                        email: email,
                        code: enteredOtp
                    },
                    {timeout: 5000}
                 );

            navigate("/setNewPass", {
                state: {
                    email,
                    code: enteredOtp,
                },
            });

        } catch (err: any) {
            if(err.code === 'ECONNREFUSED') {
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.",'error');
            }
            if (err.response.status === 400) {
                showNotificationMessage("کد وارد شده اشتباه است", 'error')
            }
            else {
                showNotificationMessage("مشکلی پیش آمده لطفا دوباره سعی کنید", 'error')
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleReSendCode = async () => {

        setIsLoadingReSend(true);
        try {
            await axios.post(
                `https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/send-verify-code-pass`,
                { email: email},
                {timeout: 10000}
            );
            navigate("/verifyPass", {
                state: {
                    email: email,
                },
            });

            showNotificationMessage("کد جدید با موفقیت ارسال شد", 'success');

        } catch (error: any) {
            if (error.code === 'ECONNREFUSED') {
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
            }
            else {
                showNotificationMessage("مشکلی پیش آمده لطفا دوباره سعی کنید", 'error');
            }
        } finally {
            setIsLoadingReSend(false);
        }
    }

    return (
        <div className={styles.VerifyPasswordContainer}>

            <AnimatePresence>
                {showNotification && (
                    <NotificationModal
                        message={notificationMessage}
                        type={notificationType}
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
                <div className={styles.codeForm}>
                    <div className={styles.hintPara}>کد ارسال شده به ایمیل خود را وارد کنید</div>
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
                                className={`${styles.otpInput} ${digit ? styles.filled : ""}`}
                                autoFocus={index === 0 && otp.every(digit => digit === "")}
                            />

                        ))}
                    </div>
                    <div>
                        <div>
                            <button
                            className={styles.submitBtn}
                            onClick={verifyCode}
                            >
                                {isLoading ? (
                                    <span className={styles.loadingText}>در حال ارسال</span>
                                ) :
                                    (
                                        "ادامه"
                                    )}

                            </button>

                        </div>

                    </div>
                    <div className={styles.notRecieved}>
                         کد هنوز نیومده؟
                        <button
                            className={styles.reSend}
                            onClick={handleReSendCode}
                            disabled={isLoadingReSend}
                        >
                            {isLoadingReSend ? (
                                <span className={styles.loadingTextReSend}>درحال ارسال</span>
                                ) : (
                                    "ارسال مجدد کد"
                            )}
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}