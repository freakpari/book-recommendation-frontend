import React, {useState} from "react";
import styles from "./SetNewPassword.module.scss";
import MainPic from "./icons/mainPic.svg"
import Logo from "./icons/logo.svg"
import Eye from "./icons/visibility.svg";
import CloseEye from "./icons/visibilityoff.svg"
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {AnimatePresence} from "framer-motion";
import { useNotification, NotificationModal } from "../../components/NotificationManager/NotificationManager";

export default function SetNewPassword() {

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const location = useLocation();
    const email = location.state?.email || "";
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();

    const [isloading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const setNewPass = async () => {
        if (newPassword === "" || confirmPassword === "") {
            showNotificationMessage("لطفا تمام فیلد ها را پر کنید", 'error');
            return;
        }
        if (newPassword.length < 8) {
            showNotificationMessage("رمز عبور باید حداقل ۸ کاراکتر باشد", 'error');
            return;
        }
        if (newPassword !== confirmPassword) {
            showNotificationMessage("رمز عبور جدید و تکرار آن یکسان نیستند", 'error');
            return;
        }
        setIsLoading(true);

        try {
            await axios.put(
                `https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/settingNewPassword`,
                {
                    email: email,
                    newpass: newPassword
                },
                {timeout: 10000}
            );

            showNotificationMessage("رمز عبور با موفقیت تغییر کرد", 'success');

            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (error: any) {
            if (error.code === 'ECONNREFUSED') {
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.",'error');
            }
            else {
                showNotificationMessage("خطا در تغییر رمز عبور", 'error');
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className={styles.ForgetPasswordContainer}>

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

                    <div className={styles.form}>
                        <div className={styles.fields}>

                            <div className={styles.passwordField}>
                                <input
                                    className={styles.inputs}
                                    type={showNewPassword ? "text" : "password"}
                                    name="NewPass"
                                    id="NewPass"
                                    minLength={8}
                                    placeholder="رمز عبور جدید"
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                    }}
                                />
                                <span className={styles.eyeIcon} onClick={() => setShowNewPassword(!showNewPassword)}>
                                    <img
                                        src={!showNewPassword ? Eye : CloseEye}
                                        alt="showPass"
                                    />
                                </span>
                            </div>
                            <div className={styles.passwordField}>
                                <input
                                    className={styles.inputs}
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="ReNewPass"
                                    id="ReNewPass"
                                    minLength={8}
                                    placeholder="تکرار رمز عبور جدید"
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                />
                                <span className={styles.eyeIcon} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <img
                                    src={!showConfirmPassword ? Eye : CloseEye}
                                    alt="showPass"
                                />
                            </span>
                            </div>

                        </div>
                        <div>
                            <button
                                className={styles.submitBtn}
                                onClick={setNewPass}
                                disabled={!newPassword || !confirmPassword}
                            >
                                {isloading ? (
                                    <span className={styles.loadingText}>در حال تایید</span>
                                ) : (
                                        "ثبت"
                                    )}
                            </button>

                        </div>
                    </div>


            </div>
        </div>
    )
}