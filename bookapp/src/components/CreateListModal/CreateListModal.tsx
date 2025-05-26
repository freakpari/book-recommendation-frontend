import React, {useEffect, useState} from "react";
import styles from "./CreateListModal.module.scss";
import { ReactComponent as Plus } from "./icons/Plus.svg";
import axios from "axios";
import {AnimatePresence, motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import { useNotification, NotificationModal } from "../../components/NotificationManager/NotificationManager";

interface Props {
    onClose: () => void;
}

export default function CreateListModal({ onClose }: Props) {
    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();const [isPublicList, setIsPublicList] = React.useState(true);
    const [title, setTitle] = React.useState("");
    const navigate = useNavigate();

    const handleCreateList = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("توکن کاربر یافت نشد.");
            return;
        }

        try {
            await axios.post("https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/user",
                {
                    ispublic: isPublicList,
                    title: title
                },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
                );

            showNotificationMessage(`لیست ${title} با موفقیت ساخته شد`,'success')

        } catch (error: any) {
            if (error.code === 'ECONNABORTED') {
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
            }
            else {
                showNotificationMessage("خطا در ساخت لیست", "error");
            }
        } finally {
            setTimeout(() => {
            navigate("/myBookList");
        }, 1200);
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
                    <div className={styles.listPhoto}>
                        <Plus
                            className={styles.plusIcon}
                        />
                    </div>
                    <div className={styles.listInfo}>
                        <div>
                            <input
                                className={styles.listNameInput}
                                type="text"
                                name="listName"
                                placeholder="نام لیست شما"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className={styles.listNameMode}>
                            <div className={styles.privateListSection}>
                                لیست خصوصی
                                <button
                                    className={`${styles.privateBtn} ${!isPublicList ? styles.selected : ""}`}
                                    onClick={() => {setIsPublicList(!isPublicList)}}
                                >
                                    <div className={`${styles.circleInBtn} ${!isPublicList ? styles.selected : ""}`}></div>
                                </button>
                            </div>
                            <div>
                                <button
                                    className={styles.submitListBtn}
                                    onClick={handleCreateList}
                                >
                                    ساخت لیست
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
