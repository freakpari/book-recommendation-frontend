import React, {useState} from "react";
import styles from "./DeleteListModal.module.scss";
import {AnimatePresence} from "framer-motion";
import { useNotification, NotificationModal } from "../NotificationManager/NotificationManager";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface Props {
    onClose: () => void;
    collectionid: string;
}

export default function DeleteListModal ({ onClose, collectionid}: Props) {

    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleDeleteCollection = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            showNotificationMessage("دسترسی غیر مجاز",'error')
            return;
        }

        try {
            setLoading(true);
            await axios.delete(`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/delete-collection?collectionid=${collectionid}`)
            showNotificationMessage("لیست با موفقیت حذف شد",'success');

            setTimeout(() => {
                navigate("/mybooklist");
            }, 1200);
        } catch (error: any) {
            if (error.code === 'ECONNABORTED') {
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
            }
            else {
                showNotificationMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید.",'error');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <AnimatePresence>
                {showNotification && (
                    <NotificationModal
                        message={notificationMessage}
                        type={notificationType}
                        onClose={() => setShowNotification(false)}
                    />
                )}
            </AnimatePresence>
            <div
                className={styles.overlay}
                onClick={onClose}
            >
            </div>

            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                        <div className={styles.question}>
                        جدی جدی لیست رو پاک کنیم؟
                        </div>
                        <div className={styles.options}>
                            <div
                                className={styles.optionNo}
                                onClick={onClose}
                            >نه قطعا</div>
                            <div
                                className={styles.optionYes}
                                onClick={handleDeleteCollection}
                            >
                                {loading ? (
                                    <span className={styles.loadingText}>در حال حذف</span>
                                ) : (
                                    "آره"
                                )}
                            </div>
                        </div>
                </div>
            </div>
        </div>

    );
}
