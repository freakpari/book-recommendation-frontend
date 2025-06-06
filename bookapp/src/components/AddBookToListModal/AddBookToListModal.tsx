import React, {useEffect, useRef, useState} from "react";
import styles from "./AddBookToListModal.module.scss";
import Tehran from "./icons/Tehran.svg"
import { ReactComponent as Plus } from "./icons/Plus.svg";
import {NotificationModal, useNotification} from "../NotificationManager/NotificationManager";
import axios from "axios";
import {AnimatePresence} from "framer-motion";

interface Props {
    onClose: () => void;
    userid: string;
}

interface CollectionInfo  {
    IsOwner: number,
    UserId: number,
    CollectionID: number,
    IsPublic: boolean,
    Title: string,
    CreateDate: string,
    Discription: string,
    ReportID: null,
    GenreID1: number,
    GenreTitle1: string,
    GenreID2: number,
    GenreTitle2: string,
    GenreID3: number,
    GenreTitle3: string,
    AccessibilityGroupID: number,
    AccessGroupTitle: string,
    AccessGroupDiscription: string,
    NumberOfDetail: number,
    UserID_1: number,
    UserName: string,
    FullName: string,
}

export default function AddBookToListModal ({ onClose, userid }: Props) {

    const [isCreateListModalOpen, setIsCreateListModalOpen] = React.useState(false);
    const {
        showNotification,
        notificationMessage,
        notificationType,
        setShowNotification,
        showNotificationMessage
    } = useNotification();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [ispublic, setIspublic] = useState(true);
    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [discription, setDiscription] = useState("");
    const [loading, setLoading] = useState(false);
    const [collection, setCollection] = useState<CollectionInfo[]>([]);
    const [userId , setUserId] = useState();
    const bookid = localStorage.getItem("bookid");

    const handleAddBookToCollection = async (collectionid: number, collectionName: string) => {
        const token = localStorage.getItem("token");
        if(!token) {
            console.log("توکن یافت نشد");
            return;
        }
        try {
            await axios.post("https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/details",
                {
                    collectionid: collectionid,
                    bookid: bookid,
                })
            showNotificationMessage(`کتاب با موفقیت به لیست${collectionName} اضافه شد`,'success');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error: any) {
            if (error.code === 'ECONNABORTED') {
                showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
            } else {
                showNotificationMessage(`خطایی رخ داد لطفا بعدا تلاش کنید`, 'error');
            }
        }

    }

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

    const handleCreateList = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("توکن کاربر یافت نشد.");
            return;
        }

        if (userId && title){
            const data = {
                ispublic : ispublic,
                title : title,
                discription : discription,
                userid : userId,
                detail : null,
            };
            console.log(ispublic);
            try {
                setLoading(true);
                const formData = new FormData();
                if (image) {
                    formData.append("file", image);
                }
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

                showNotificationMessage(`لیست "${title}" با موفقیت ساخته شد`, 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            } catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
                } else {
                    console.error(`خطایی رخ داد لطفا بعدا تلاش کنید`, 'error');
                }
            } finally {
                setLoading(false);
            }
        } else {
            showNotificationMessage("لطفاً تمام فیلدها را پر کنید",'error')
        }

    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token) {
            console.error("توکن یافت نشد.");
            return;
        }

        const fetchUserId = async () => {
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
                    console.error("دسترسی غیرمجاز", 'error');
                }
                if (error.response?.status === 404) {
                    console.error("کاربر یافت نشد", 'error');
                } else {
                    console.error("خطا در دریافت اطلاعات کاربر", "error");
                }
            }
        }

        const fetchUserCollection = async () => {
            try {
                const response = await axios.get("https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/user",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })

                setCollection(response.data);

            } catch (error: any) {
                if (error.code === 'ECONNABORTED') {
                    showNotificationMessage("سرور پاسخ نداد. لطفاً بعداً تلاش کنید.", 'error');
                } else {
                    console.error(`خطایی رخ داد لطفا بعدا تلاش کنید`, 'error');
                }
            }
        }

        fetchUserId();
        fetchUserCollection();
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

            {!isCreateListModalOpen && (
                <div>
                    <div
                        className={styles.overlay}
                        onClick={onClose}
                    >
                    </div>
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <div className={styles.bookListContainer}>
                                <div className={styles.userListDrawer}>
                                    {collection.map((list) => (
                                        <div
                                            className={styles.listContent}
                                            onClick={() => handleAddBookToCollection(list.CollectionID, list.Title)}
                                        >
                                            <div className={styles.listPic}>
                                                <img
                                                    src={`https://intelligent-shockley-8ynjnlm8e.liara.run/api/collection/pic/${list.CollectionID}`}
                                                    alt={list.Title}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = Tehran;
                                                    }}
                                                />
                                            </div>
                                            <div className={styles.listDescription}>
                                                <div className={styles.listTitle}>
                                                    {list.Title}
                                                </div>
                                                <div className={styles.listIncludes}>{list.Discription}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.createListContainer}>
                                <button
                                    className={styles.createListBtn}
                                >
                                    <div
                                        className={styles.btnContent}
                                        onClick={() => {setIsCreateListModalOpen(true);}}
                                    >
                                        ساخت لیست جدید
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isCreateListModalOpen && (
                <div>
                    <div
                        className={styles.cloverlay}
                        onClick={() => setIsCreateListModalOpen(false)}
                    />

                    <div className={styles.clmodalOverlay}>
                        <div className={styles.clmodalContent}>
                            <div className={styles.cllistPhoto}>
                                {image ? (
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Preview"
                                        className={styles.clpreviewImage}
                                        onClick={() => fileInputRef.current?.click()}
                                    />
                                ) : (
                                    <>
                                        <Plus
                                            className={styles.clplusIcon}
                                            onClick={() => fileInputRef.current?.click()}
                                        />
                                    </>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className={styles.clfileInput}
                                />
                            </div>

                            <div className={styles.cllistInfo}>
                                <div className={styles.cllistInputs}>
                                    <input
                                        className={styles.cllistNameInput}
                                        type="text"
                                        name="listName"
                                        placeholder="نام لیست شما"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <input
                                        className={styles.cllistNameInput}
                                        type="text"
                                        name="listDescription"
                                        placeholder="توضیحات"
                                        onChange={(e) => setDiscription(e.target.value)}
                                    />
                                </div>

                                <div className={styles.cllistNameMode}>
                                    <div className={styles.clprivateListSection}>
                                        لیست خصوصی
                                        <button
                                            className={`${styles.clprivateBtn} ${!ispublic ? styles.selected : ""}`}
                                            onClick={() => setIspublic(!ispublic)}
                                        >
                                            <div
                                                className={`${styles.clcircleInBtn} ${!ispublic ? styles.selected : ""}`}
                                            />
                                        </button>
                                    </div>

                                    <div>
                                        <button
                                            className={styles.clsubmitListBtn}
                                            onClick={handleCreateList}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <span className={styles.clloadingText}>در حال ساخت</span>
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
            )}

        </div>

    );
}
