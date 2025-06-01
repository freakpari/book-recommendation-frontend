import React, {useEffect, useState, useRef} from "react";
import styles from "./CreateListModal.module.scss";
import { ReactComponent as Plus } from "./icons/Plus.svg";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useNotification, NotificationModal } from "../NotificationManager/NotificationManager";

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
    } = useNotification();

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isPublic, setIsPublic] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [userId , setUserId] = useState();

    const handleCreateList = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("توکن کاربر یافت نشد.");
            return;
        }

        const data = {
            Ispublic: isPublic,
            title: title,
            discription: "",
            userid: userId,
            detail: [],
        };

        const dataNoImage = {
            ispublic: isPublic,
            title: title,
        }

        try {if (image) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("data", JSON.stringify(data));

            await axios.post(
                "https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/upload-collection",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        } else {
            await axios.post(
                "https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/user",
                dataNoImage,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
        }
            showNotificationMessage(`لیست "${title}" با موفقیت ساخته شد`, 'success');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error: any) {
            if (error.code === 'ECONNABORTED') {
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
            } else {
                showNotificationMessage("خطا در ساخت لیست", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const MAX_SIZE_MB = 2;
        const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

        if (file.size > MAX_SIZE_BYTES) {
            showNotificationMessage(`حجم عکس نباید بیشتر از ${MAX_SIZE_MB} مگابایت باشد.`, "error");
            return;
        }

        setImage(file);
    };


    useEffect(() => {
        const fetchUserId = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("توکن یافت نشد");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profile`,
                    {
                        headers:
                            {
                                Authorization: `Bearer ${token}`
                            },
                        timeout: 10000
                    },
                );
                const user = response.data.user;
                setUserId(user.id);
            } catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
                }
                if (error.response?.status === 401) {
                    showNotificationMessage("دسترسی غیرمجاز", 'error');
                }
                if (error.response?.status === 404) {
                    showNotificationMessage("کاربر یافت نشد", 'error');
                } else {
                    showNotificationMessage("خطا در دریافت اطلاعات کاربر", "error");
                }
            }
        }

        fetchUserId();
    },[]);

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

            <div className={styles.overlay} onClick={onClose} />

            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <div className={styles.listPhoto}>
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className={styles.previewImage}
                                onClick={() => fileInputRef.current?.click()}
                            />
                        ) : (
                            <>
                                <Plus
                                    className={styles.plusIcon}
                                    onClick={() => fileInputRef.current?.click()}
                                />
                            </>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className={styles.fileInput}
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
                                    className={`${styles.privateBtn} ${isPublic ? styles.selected : ""}`}
                                    onClick={() => setIsPublic(!isPublic)}
                                >
                                    <div
                                        className={`${styles.circleInBtn} ${isPublic ? styles.selected : ""}`}
                                    />
                                </button>
                            </div>

                            <div>
                                <button
                                    className={styles.submitListBtn}
                                    onClick={handleCreateList}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className={styles.loadingText}>در حال ساخت</span>
                                    ) : (
                                        "ساخت لیست"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
